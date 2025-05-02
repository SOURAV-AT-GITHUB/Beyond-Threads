const UserRoute = require("express").Router();
const pool = require("../config/postgres.config");
require("dotenv").config();
const admin = require("../config/firebase.config");

UserRoute.post("/login", async (req, res) => {
  const { idToken } = req.body;
  if (!idToken) return res.status(400).json({ message: "Invalid request" });
  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    const { email, uid } = decoded;
    const userCheck = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (userCheck.rowCount === 0) {
      await pool.query(
        "INSERT INTO users (email,firebase_uid) VALUES ($1, $2)",
        [email, uid]
      );
      //add a user cart
      // await pool.query("INSERT INTO cart_table (")
    }
    res.json({token:idToken})
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = UserRoute