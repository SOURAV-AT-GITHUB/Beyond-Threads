const UserRoute = require("express").Router();
const pool = require("../config/postgres.config");
require("dotenv").config();
const admin = require("../config/firebase.config");
const CartRoute = require("./cart.route");
UserRoute.use("/cart", CartRoute);

UserRoute.post("/login", async (req, res) => {
  const { idToken } = req.body;
  if (!idToken) return res.status(400).json({ message: "Invalid request" });
  let client;
  try {
    client = await pool.connect();
    await client.query("BEGIN");
    const decoded = await admin.auth().verifyIdToken(idToken);
    const { email, uid, name } = decoded;
    const userCheck = await client.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    let cartItems = [];
    if (userCheck.rowCount === 0) {
      await client.query(
        "INSERT INTO users (email,firebase_uid,name) VALUES ($1, $2, $3)",
        [email, uid, name]
      );
    } else {
      const userId = userCheck.rows[0].id;
      const cartResult = await client.query(
        `
  SELECT
    cart_items.id AS id,
    cart_items.quantity,
    products.id AS product_id,
    products.name,
    products.images[1] AS image,
    products.price,
    products.stock
  FROM cart_items
  JOIN products ON cart_items.product_id = products.id
  WHERE cart_items.user_id = $1
`,
        [userId]
      );
      cartItems = cartResult.rows;
    }
    await client.query("COMMIT");
    res.json({ token: idToken, cart: cartItems });
  } catch (error) {
    await client.query("ROLLBACK");
    return res.status(500).json({ message: error.message });
  } finally {
    if (client) client.release();
  }
});

module.exports = UserRoute;
