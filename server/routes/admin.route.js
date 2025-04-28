const pool = require("../config/postgres.config");
const AdminRoute = require("express").Router();
require("dotenv").config();
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

AdminRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Invalid request!" });
  try {
    const quesy = `SELECT * FROM admin WHERE email = $1`;
    const admin = await pool.query(quesy, [email]);
    if (admin.rowCount === 0)
      return res
        .status(404)
        .json({ message: `No admin associated with email - ${email}` });
    if (admin.rows[0].password !== password)
      return res.status(401).json({ message: "Incorrect password!!" });
    const token = jwt.sign(
      { name: admin.rows[0].name, email: admin.rows[0].name, date: new Date() },
      JWT_SECRET_KEY,
      { expiresIn: "45m" }
    );
    return res.json({
      name: admin.rows[0].name,
      email: admin.rows[0].email,
      token,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error, please try again!" });
  }
});

module.exports = AdminRoute;
