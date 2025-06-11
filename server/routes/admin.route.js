const pool = require("../config/postgres.config");
const AdminRoute = require("express").Router();
require("dotenv").config();
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY_ADMIN = process.env.JWT_SECRET_KEY_ADMIN;
const verifyAdmin = require("../middlewares/verifyAdmin");
const XLSX = require("xlsx");

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
      JWT_SECRET_KEY_ADMIN,
      { expiresIn: "4h" }
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
AdminRoute.get("/dashboard", verifyAdmin, async (req, res) => {
  try {
    const detailsRes = await pool.query(`
    SELECT 
    SUM(final_amount) AS total_sales,
    COUNT(*) AS total_orders,
    COUNT(CASE WHEN status = 'confirmed' THEN 1 END) AS yet_to_dispatch
FROM orders;
`);
    const productRes = await pool.query(`
  SELECT 
    COUNT(*) AS total_products
FROM products;
`);
    const ordersRes = await pool.query(`
SELECT 
    o.id,
    o.final_amount,
    o.created_at,
    o.status,
    o.created_at,
    u.name AS user_name,
    u.email AS email,
    p.contact AS contact
FROM orders o
JOIN users u ON o.user_id = u.id
JOIN payments p ON o.payment_id = p.id
ORDER BY o.created_at DESC
LIMIT 5;
`);
    return res.json({
      details: { ...detailsRes.rows[0], ...productRes.rows[0] },
      latest_orders: ordersRes.rows,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
AdminRoute.get("/orders", verifyAdmin, async (req, res) => {
  const { status } = req.query;
  try {
    let query = `
SELECT 
    o.id,
    o.final_amount,
    o.created_at,
    o.status,
    o.created_at,
    u.name AS user_name,
    u.email AS email,
    p.contact AS contact
FROM orders o
JOIN users u ON o.user_id = u.id
JOIN payments p ON o.payment_id = p.id`;
    const values = [];
    if (status) {
      query += `
   WHERE o.status = $1`;
      values.push(status);
    }
    query += `
ORDER BY o.created_at DESC ;`;
    const { rows, rowCount } = await pool.query(query, values);
    if (rowCount === 0)
      return res.status(404).json({ message: "No Data Found." });
    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
AdminRoute.get("/export-users", verifyAdmin, async (req, res) => {
  try {
    const query = `
      SELECT 
        u.name,
        u.email,
        COUNT(o.id) AS total_orders
      FROM 
        users u
      LEFT JOIN 
        orders o ON o.user_id = u.id
      GROUP BY 
        u.id, u.name, u.email
      ORDER BY 
        total_orders DESC;
    `;
    const { rowCount, rows } = await pool.query(query);
    if (rowCount === 0) {
      return res.status(404).json({ message: "User database empty" });
    }
    // Create worksheet from rows
    const worksheetData = [
      ["Name", "Email", "Total Orders"], // headers
      ...rows.map((row) => [row.name, row.email, row.total_orders]),
    ];
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

    // Write workbook to buffer
    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=users.xlsx");
    res.send(buffer);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
module.exports = AdminRoute;
