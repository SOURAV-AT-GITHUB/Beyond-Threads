const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET_KEY_ADMIN = process.env.JWT_SECRET_KEY_ADMIN;

module.exports = function verifyAdmin(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1] || null;
    if (!token) return res.status(401).json({ message: "Please Login First." });

    jwt.verify(token, JWT_SECRET_KEY_ADMIN, (err, decoded) => {
      if (err)
        return res
          .status(401)
          .json({ message: "Token expired, please login again" });
      req.user = decoded;
      return next();
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error while authentication." });
  }
};
