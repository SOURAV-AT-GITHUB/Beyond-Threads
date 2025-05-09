const CartRoute = require("express").Router({ mergeParams: true });
const pool = require("../config/postgres.config");
const verifyClient = require("../middlewares/verifyClient");
CartRoute.post("/", verifyClient, async (req, res) => {
  const user_id = req.user.id;
  const { product_id } = req.body;
  if (!product_id) return res.status(400).json({ message: "Invalid request" });
  try {
    const query1 = `INSERT INTO cart_item (user_id, product_id, quantity) 
    VALUES ($1, $2, $3)
    ON CONFLICT (user_id, product_id)
    DO UPDATE SET quantity = cart_item.quantity + $3
    RETURNING *`;
    const response = await pool.query(query1, [user_id, product_id, 1]);

    const query2 = `
  SELECT
    id AS product_id,
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
    const query = `UPDATE cart_item
    SET quantity = $3
    WHERE user_id = $1 AND product_id = $2
    RETURNING *`;
    await pool.query(query, [user_id, product_id, quantity]);
    const query2 = `
  SELECT
    cart_item.id AS cart_item_id,
    cart_item.quantity,
    products.id AS id,
    products.name,
    products.images[1] AS image,
    products.price,
    products.stock
  FROM cart_item
  JOIN products ON cart_item.product_id = products.id
  WHERE cart_item.user_id = $1 AND cart_item.product_id = $2
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
      `DELETE FROM cart_item
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
    cart_item.id AS cart_item_id,
    cart_item.quantity,
    products.id AS id,
    products.name,
    products.images[1] AS image,
    products.price,
    products.stock
  FROM cart_item
  JOIN products ON cart_item.product_id = products.id
  WHERE cart_item.user_id = $1
`;
    const response = await pool.query(query, [user_id]);
    return res.json(response.rows);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = CartRoute;
