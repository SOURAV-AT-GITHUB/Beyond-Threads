const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./config/postgres.config");
const createAdminTable = require("./models/admin.model");
const createProductTable = require("./models/product.model");
const createUsersTable = require("./models/user.model");
const createCartItemTable = require("./models/cartItems.model");
const createDiscountTable = require("./models/discount.model")
const createAddressTable = require("./models/addresses.model")
const createPaymentsTable = require("./models/payments.model")
const createOrdersTable = require("./models/orders.model")
const createOrderItemTable = require("./models/orderItem.model")
const createSectionsTable = require("./models/sections.model")
const createSectionProductsTable = require("./models/sectionProducts.model")
const createOrderDiscountTable = require("./models/orderDiscount.model")
const AdminRoute = require("./routes/admin.route");
const ProductRoute = require("./routes/products.route");
const UserRoute = require("./routes/user.route");

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3000;

app.use("/admin", AdminRoute);
app.use("/products", ProductRoute);
app.use("/client", UserRoute);
app.use("/uploads", express.static("uploads")); // Serve static files (images)
app.get("/", (req, res) => {
  res.json({ message: "Server in up!!" });
});

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  let client
  try {
    client = await pool.connect();
    await createAdminTable(client);
    await createProductTable(client);
    await createUsersTable(client);
    await createCartItemTable(client);
    await createDiscountTable(client);
    await createAddressTable(client)
    await createPaymentsTable(client)
    await createOrdersTable(client)
    await createOrderItemTable(client)
    await createSectionsTable(client)
    await createSectionProductsTable(client)
    await createOrderDiscountTable(client)
    console.log("Database initialized with tables.");
  } catch (error) {
    console.log("Database connection failed", error);
  }finally{
   if(client) client.release()
  }
});