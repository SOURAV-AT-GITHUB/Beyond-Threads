const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./config/postgres.config");
const createAdminTable = require("./models/admin.model");
const AdminRoute = require('./routes/admin.route')

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3000;

app.use('/admin',AdminRoute)

app.get("/", (req, res) => {
  res.json({ message: "Server in up!!" });
});

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    await pool.connect();
    await createAdminTable();
    console.log("Database connected.");
  } catch (error) {
    console.log("Database connection failed", error.message);
  }
});
