const CartRoute = require("express").Router({ mergeParams: true });
const pool = require("../config/postgres.config");
const verifyClient = require("../middlewares/verifyClient");
const Razorpay = require("razorpay");
require("dotenv").config();
const crypto = require("crypto");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

function verifySignature(order_id, payment_id, signature, secret) {
  const body = order_id + "|" + payment_id;
  const expected = crypto
    .createHmac("sha256", secret)
    .update(body.toString())
    .digest("hex");

  return expected === signature;
}
CartRoute.post("/", verifyClient, async (req, res) => {
  const user_id = req.user.id;
  const { product_id } = req.body;
  if (!product_id) return res.status(400).json({ message: "Invalid request" });
  try {
    const query1 = `INSERT INTO cart_items (user_id, product_id, quantity) 
    VALUES ($1, $2, $3)
    ON CONFLICT (user_id, product_id)
    DO UPDATE SET quantity = cart_items.quantity + $3
    RETURNING *`;
    const response = await pool.query(query1, [user_id, product_id, 1]);

    const query2 = `
  SELECT
    id,
    name,
    images[1] AS image,
    price,
    stock
  FROM products
  WHERE id = $1
`;
    const result = await pool.query(query2, [product_id]);
    res.status(201).json({ ...response.rows[0], ...result.rows[0] });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

CartRoute.put("/", verifyClient, async (req, res) => {
  const user_id = req.user.id;
  const { product_id, quantity } = req.body;
  if (!product_id) return res.status(400).json({ message: "Invalid request" });
  try {
    const query = `UPDATE cart_items
    SET quantity = $3
    WHERE user_id = $1 AND product_id = $2
    RETURNING *`;
    await pool.query(query, [user_id, product_id, quantity]);
    const query2 = `
  SELECT
    cart_items.id AS cart_items_id,
    cart_items.quantity,
    products.id AS id,
    products.name,
    products.images[1] AS image,
    products.price,
    products.stock
  FROM cart_items
  JOIN products ON cart_items.product_id = products.id
  WHERE cart_items.user_id = $1 AND cart_items.product_id = $2
`;
    const result = await pool.query(query2, [user_id, product_id]);
    return res.json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

CartRoute.delete("/", verifyClient, async (req, res) => {
  const user_id = req.user.id;
  const { product_id } = req.body;

  if (!product_id) return res.status(400).json({ message: "Invalid request" });
  try {
    await pool.query(
      `DELETE FROM cart_items
       WHERE user_id = $1 AND product_id = $2`,
      [user_id, product_id]
    );

    return res.json({ mesage: "Item removed." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

CartRoute.get("/", verifyClient, async (req, res) => {
  const user_id = req.user.id;
  try {
    const query = `
  SELECT
    cart_items.id AS cart_items_id,
    cart_items.quantity,
    products.id AS id,
    products.name,
    products.images[1] AS image,
    products.price,
    products.stock
  FROM cart_items
  JOIN products ON cart_items.product_id = products.id
  WHERE cart_items.user_id = $1
  ORDER BY cart_items.created_at ASC
`;
    const response = await pool.query(query, [user_id]);
    return res.json(response.rows);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

CartRoute.post("/create-order", verifyClient, async (req, res) => {
  const user_id = req.user.id;

  try {
    const response = await pool.query(
      `SELECT
       cart_items.quantity AS quantity,
        products.price AS price
      FROM cart_items
      JOIN products ON cart_items.product_id = products.id
      WHERE cart_items.user_id = $1`,
      [user_id]
    );
    if (response.rowCount === 0)
      return res.status(400).json({ message: "No cart items found." });
    const totalAmount = response.rows.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const { rows: discounts } = await pool.query(`SELECT * from discounts`);
    if (discounts.length === 0)
      return res
        .status(400)
        .json({ message: "Something went wrong while applying coupons." });
    const discountsApplied = [];
    const { rowCount: existingsOrders } = await pool.query(
      `SELECT * FROM orders WHERE user_id = $1`,
      [user_id]
    );
    if (existingsOrders === 0)
      discountsApplied.push(
        ...discounts.filter((discount) => discount.for_first_order === true)
      );
    if (totalAmount >= 5000 && totalAmount <= 6999) {
      discountsApplied.push(
        ...discounts.filter((discount) => discount.code === "SAVE300")
      );
    } else if (totalAmount >= 7000) {
      discountsApplied.push(
        ...discounts.filter((discount) => discount.code === "SAVE500")
      );
    }
    const final_amount = discountsApplied.reduce(
      (prev, discount) => prev - discount.discount_value,
      totalAmount
    );
    const options = {
      amount: final_amount * 100, // Amount in paisa
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error creating order" });
  }
});

CartRoute.post("/verify-payment", verifyClient, async (req, res) => {
  const user_id = req.user.id;
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    amount,
    email,
    contact,
    country,
    first_name,
    last_name,
    address_1,
    address_2,
    city,
    state,
    pincode,
  } = req.body;
  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !amount ||
    !email ||
    !contact ||
    !country ||
    !first_name ||
    !last_name ||
    !address_1 ||
    !address_2 ||
    !city ||
    !state ||
    !pincode
  )
    return res.status(400).json({ message: "Invalid request" });
  const isValid = verifySignature(
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    process.env.RAZORPAY_KEY_SECRET
  );

  if (!isValid) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid signature" });
  }
  let client;
  try {
    const { rows: cart_items } = await pool.query(
      `SELECT
       cart_items.quantity AS quantity,
        products.price AS price
      FROM cart_items
      JOIN products ON cart_items.product_id = products.id
      WHERE cart_items.user_id = $1`,
      [user_id]
    );
    if (cart_items.length === 0)
      return res.status(400).json({ message: "No cart items found." });
    const totalAmount = cart_items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const { rows: discounts } = await pool.query(`SELECT * from discounts`);
    if (discounts.length === 0)
      return res
        .status(400)
        .json({ message: "Something went wrong while applying coupons." });
    const discountsApplied = [];
    const { rowCount: existingsOrders } = await pool.query(
      `SELECT * FROM orders WHERE user_id = $1`,
      [user_id]
    );
    if (existingsOrders === 0)
      discountsApplied.push(
        ...discounts.filter((discount) => discount.for_first_order === true)
      );
    if (totalAmount >= 5000 && totalAmount <= 6999) {
      discountsApplied.push(
        ...discounts.filter((discount) => discount.code === "SAVE300")
      );
    } else if (totalAmount >= 7000) {
      discountsApplied.push(
        ...discounts.filter((discount) => discount.code === "SAVE500")
      );
    }
    const final_amount = discountsApplied.reduce(
      (prev, discount) => prev - discount.discount_value,
      totalAmount
    );
    if (final_amount * 100 !== amount)
      return res.status(400).json({ message: "Invalid request" });
    client = await pool.connect();
    await client.query("BEGIN");
    //1.Update product stock
    await client.query(
      `UPDATE products
        SET stock = stock - oi.quantity
        FROM order_items oi
        WHERE products.id = oi.product_id AND oi.order_id = $1`,
      [orderId]
    );
    // 2. Insert payment record
    const paymentResponse = await client.query(
      `INSERT INTO payments (
        user_id,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        amount,
        email,
        contact,
        paid_at
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, NOW()
      )
        RETURNING id ;`,
      [
        user_id,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        amount,
        email,
        contact,
      ]
    );
    const paymentId = paymentResponse.rows[0].id;
    // 3. Insert address in db
    const addresResponse = await client.query(
      `INSERT INTO addresses (user_id, email, country, first_name, last_name, address_1, address_2, city, state, pincode, contact)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING id ;
      `,
      [
        user_id,
        email,
        country,
        first_name,
        last_name,
        address_1,
        address_2,
        city,
        state,
        pincode,
        contact,
      ]
    );
    const addressId = addresResponse.rows[0].id;
    // 4. Create order record
    const orderRes = await client.query(
      `INSERT INTO orders (user_id, payment_id, address_id, total_amount, final_amount, status, created_at)
       VALUES ($1, $2, $3, $4, $4, 'confirmed', NOW())
       RETURNING id`,
      [user_id, paymentId, addressId, amount] //update total_amount and final_amount after discounts
    );
    const orderId = orderRes.rows[0].id;

    // 5. Move cart items to order_items
    await client.query(
      `INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase)
       SELECT $1, ci.product_id, ci.quantity, p.price
       FROM cart_items ci
       JOIN products p ON ci.product_id = p.id
       WHERE user_id = $2`,
      [orderId, user_id]
    );
    // Later update the total and final price according to discount
    // 6. Save discount history
    if (discountsApplied.length > 0) {
      const placeholders = [];
      const discountIds = [];
      discountsApplied.forEach((ele, index) => {
        discountIds.push(ele.id);
        placeholders.push(`($1, $${index + 2})`);
      });
      await client.query(
        `INSERT INTO order_discounts (order_id, discount_id)
         VALUES ${placeholders.join(", ")}`,
        [user_id, ...discountIds]
      );
    }
    // 7. Clear user's cart
    await client.query(`DELETE FROM cart_items WHERE user_id = $1`, [user_id]);
    await client.query("COMMIT");
    return res.json({
      // success: true,
      message: "Payment verified and order placed",
      // order_id: orderId,
    });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Payment verification failed:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while verifying payment",
    });
  } finally {
    if (client) client.release();
  }
});

module.exports = CartRoute;
