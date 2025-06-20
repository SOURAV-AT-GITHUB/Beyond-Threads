const UserRoute = require("express").Router();
const pool = require("../config/postgres.config");
require("dotenv").config();
const admin = require("../config/firebase.config");
const CartRoute = require("./cart.route");
const verifyClient = require("../middlewares/verifyClient");
UserRoute.use("/cart", CartRoute);

UserRoute.post("/login", async (req, res) => {
  const { idToken } = req.body;
  if (!idToken) return res.status(400).json({ message: "Invalid request" });

  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    const { email, uid, name } = decoded;
    const userCheck = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (userCheck.rowCount === 0) {
      await pool.query(
        "INSERT INTO users (email,firebase_uid,name) VALUES ($1, $2, $3)",
        [email, uid, name]
      );
    }
    return res.json({ message: "Login Success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
UserRoute.get("/orders", verifyClient, async (req, res) => {
  const user_id = req.user.id;
  try {
    const query = `SELECT 
  o.id AS order_id,
  o.created_at AS date,
  o.status AS status,
  o.final_amount AS final_amount,
  o.total_amount AS total_amount,
  -- Aggregate the order items into an array of objects
  array_agg(
    jsonb_build_object(
      'name', p.name,
      'image', p.images[1],
      'quantity', oi.quantity,
      'price', oi.price_at_purchase
    )
  ) AS order_items,
  -- Select the address as a single object
  jsonb_build_object(
    'first_name',ad.first_name,
    'last_name',ad.last_name,
    'email',ad.email,
    'contact',ad.contact,
    'address_1', ad.address_1,
    'address_2', ad.address_2,
    'city', ad.city,
    'state', ad.state,
    'pincode', ad.pincode
  ) AS address
FROM orders o
JOIN order_items oi ON oi.order_id = o.id
JOIN products p ON p.id = oi.product_id
JOIN addresses ad ON ad.id = o.address_id
WHERE o.user_id = $1
GROUP BY o.id, ad.id

  `;
    const { rows, rowCount } = await pool.query(query, [user_id]);
    if (rowCount === 0)
      return res.json({
        message: "You don't have any past orders.",
        orders: [],
      });
    return res.json({ orders: rows });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
UserRoute.get("/address",verifyClient, async (req, res) => {
  const { pincode } = req.query;

  if (!pincode || !/^\d{6}$/.test(pincode)) {
    return res.status(400).json({ message: "Invalid Indian PIN code" });
  }

  const apiKey = process.env.GOOGLE_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:${pincode}|country:IN&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== "OK" || data.results.length === 0) {
      return res.status(404).json({ message: "No address found, please try with valid pincode" });
    }

    const components = data.results[0].address_components;
    let city = "";
    let state = "";

    components.forEach((comp) => {
      if (
        !city &&
        (comp.types.includes("sublocality_level_1") ||
          comp.types.includes("locality"))
      ) {
        city = comp.long_name;
      }
      if (comp.types.includes("administrative_area_level_1")) {
        state = comp.long_name;
      }
    });
    if (!city || !state)
      return res
        .status(404)
        .json({ message: "Sorry are currently unavailabe at this pincode, try another pincode." });
    return res.json({
      city,
      state,
      // localities: data.results[0].postcode_localities,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});
module.exports = UserRoute;
