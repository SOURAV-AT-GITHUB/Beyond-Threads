const admin = require("../config/firebase.config");
const pool = require("../config/postgres.config");
module.exports = async function verifyClient(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1] || null;
  if (!token) return res.status(401).json({ message: "Please Login First." });
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    const { uid } = decoded;
    const { rows } = await pool.query(
      "SELECT * FROM users WHERE firebase_uid = $1",
      [uid]
    );
    if (!rows.length)
      return res.status(401).json({ message: "Please login again." });
    req.user = rows[0];
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Login Token" });
  }
};
