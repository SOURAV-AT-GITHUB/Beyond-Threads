const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({ message: "Server in up!!" });
});

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

});
