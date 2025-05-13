const pool = require("../config/postgres.config");
const ProductRoute = require("express").Router();
require("dotenv").config();
const verifyAdmin = require("../middlewares/verifyAdmin");
const fs = require("fs").promises;
const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname.replaceAll(" ", "-")),
});
const upload = multer({ storage });
//GET /products - get products based of category(menswear/womensewar) or sub_category(New Arrivals) or all products 
ProductRoute.get("/", async (req, res) => {
  const { category, sub_category } = req.query;
  const filters = req.query;
  let query =
    "SELECT id, name, price, images[1] as image, stock FROM products WHERE";
  const queryParams = [];
  let queryIndex = 1;
  try {
    if (category) {
      query += " category ILIKE $1";
      queryParams.push(category);
      queryIndex++;
    } else if (sub_category) {
      query += " sub_category ILIKE $1";
      queryParams.push(`${sub_category.replace("-", " ")}`);
      queryIndex++;
    } else {
      // return res.status(400).json({ message: "Invalid query" });
      query += " 1 = 1";
    }

    if (filters.instock) {
      query += ` AND stock > 0`;
    }
    if (filters.minPrice && filters.maxPrice) {
      query += ` AND price >= $${queryIndex++} AND price <= $${queryIndex++}`;
      queryParams.push(Number(filters.minPrice));
      queryParams.push(Number(filters.maxPrice));
    }
    if (filters.fabrics) {
      query += ` AND fabric = ANY($${queryIndex++})`;
      queryParams.push([filters.fabrics]);
    }
    if (filters.colors) {
      const colors = Array.isArray(filters.colors)
        ? filters.colors.map((color) => color.toLowerCase())
        : [filters.colors.toLowerCase()];
      query += ` AND EXISTS (
          SELECT 1 FROM unnest(color_codes) AS color
          WHERE LOWER(color) = ANY($${queryIndex++}::text[])
        )
      `;
      queryParams.push(colors);
    }
    if (filters.patterns) {
      const patterns = Array.isArray(filters.patterns)
        ? filters.patterns.map((p) => p.trim().toLowerCase())
        : [filters.patterns.trim().toLowerCase()]; // Ensure array
      query += `
        AND EXISTS (
            SELECT 1 FROM unnest($${queryIndex++}::text[]) AS ptn
            WHERE pattern ILIKE '%' || ptn || '%'
        )
      `;
      queryParams.push(patterns);
    }
    if (Number(filters.limit)) {
      query += ` 
      LIMIT $${queryIndex++}`;
      queryParams.push(filters.limit);
    }
    const response = await pool.query(query, queryParams);
    if (response.rowCount === 0)
      return res.status(404).json({ message: "No related products found" });
    else return res.json(response.rows);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
//GET /products/:id - Get a single product with id
ProductRoute.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await pool.query("SELECT * from products WHERE id = $1", [
      id,
    ]);
    if (response.rowCount === 0)
      return res.status(404).json({ message: "Product Not Found." });
    else return res.json(response.rows[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
//POST /products - Add a new product
ProductRoute.post( "/",verifyAdmin, upload.array("images", 10),async (req, res) => {
    const images = req.files;
    const {
      name,
      price,
      stock,
      color_name,
      color_codes,
      pattern,
      care,
      category,
      sub_category,
      product_type,
      length,
      blouse_piece,
      fabric,
      blouse,
      disclaimer,
      sku,
      what_you_will_receive,
      description,
      note,
    } = req.body;
    const imagePaths = images.map((image) => image.filename);
    const query = `INSERT INTO products (name,price,stock,color_name,color_codes,pattern,care,category,sub_category,product_type,length,blouse_piece,fabric,blouse,disclaimer,sku,what_you_will_receive,description,note,images)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
  `;
    try {
      await pool.query(query, [
        name,
        price,
        stock,
        color_name,
        color_codes.split(","),
        pattern,
        care,
        category,
        sub_category,
        product_type,
        length,
        blouse_piece,
        fabric,
        blouse,
        disclaimer,
        sku,
        what_you_will_receive,
        description,
        note,
        imagePaths,
      ]);
      return res.status(201).json({ message: "product added" });
    } catch (error) {
      console.log(error.message);
      return res
        .status(500)
        .json({ message: error.message || "Internal server error." });
    }
  }
);
//PATCH /products/:id - Update a product details
ProductRoute.patch("/:id", verifyAdmin, async (req, res) => {
  const { id } = req.params;
  const fields = req.body;

  try {
    // Validate incoming fields here if needed

    const updateQuery = `
  UPDATE products SET
    name = $1,
    price = $2,
    color_name = $3,
    color_codes = $4,
    pattern = $5,
    care = $6,
    category = $7,
    sub_category = $8,
    product_type = $9,
    length = $10,
    blouse_piece = $11,
    fabric = $12,
    blouse = $13,
    disclaimer = $14,
    sku = $15,
    what_you_will_receive = $16,
    description = $17,
    note = $18
  WHERE id = $19
`;

    const values = [
      fields.name,
      fields.price,
      fields.color_name,
      fields.color_codes,
      fields.pattern,
      fields.care,
      fields.category,
      fields.sub_category,
      fields.product_type,
      fields.length,
      fields.blouse_piece,
      fields.fabric,
      fields.blouse,
      fields.disclaimer,
      fields.sku,
      fields.what_you_will_receive,
      fields.description,
      fields.note,
      id,
    ];

    await pool.query(updateQuery, values);

    res.status(200).json({ message: "Product updated successfully" });
  } catch (err) {
    console.error("Update failed:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});
// PATCH /products/:id/stock — quick stock update
ProductRoute.patch("/:id/stock", verifyAdmin, async (req, res) => {
  const { id } = req.params;
  const { stock } = req.body;

  try {
    await pool.query(`UPDATE products SET stock = $1 WHERE id = $2`, [
      stock,
      id,
    ]);
    res.status(200).json({ message: "Stock updated" });
  } catch (err) {
    console.error("Stock update failed:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});
// POST /products/:id/images — upload images
ProductRoute.post("/:id/images",verifyAdmin,
  upload.array("images", 10),
  async (req, res) => {
    const { id } = req.params;
    const images = req.files;

    try {
      if (!images || images.length === 0)
        return res.status(400).json({ error: "No files uploaded" });

      const imagePaths = images.map((image) => image.filename);

      const existing = await pool.query(
        `SELECT images FROM products WHERE id = $1`,
        [id]
      );
      const currentImages = existing.rows[0].images || [];

      const updatedImages = [...currentImages, ...imagePaths].slice(0, 10); // enforce limit

      await pool.query(`UPDATE products SET images = $1 WHERE id = $2`, [
        updatedImages,
        id,
      ]);

      res.status(200).json({ message: "Images uploaded", images: imagePaths });
    } catch (err) {
      console.error("Image upload failed:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);
// DELETE /products/:id/images?index=2 - delete image at index
ProductRoute.delete("/:id/images", verifyAdmin, async (req, res) => {
  const { id } = req.params;
  const index = parseInt(req.query.index, 10);

  try {
    const existing = await pool.query(
      `SELECT images FROM products WHERE id = $1`,
      [id]
    );
    let images = existing.rows[0].images;

    if (!images || index < 0 || index >= images.length)
      return res.status(400).json({ error: "Invalid image index" });

    const image = images.splice(index, 1)[0]; // remove image
    const filePath = path.join(__dirname, `../uploads/${image}`);
    await fs.unlink(filePath);
    await pool.query(`UPDATE products SET images = $1 WHERE id = $2`, [
      images,
      id,
    ]);

    res.status(200).json({ message: "Image deleted" });
  } catch (err) {
    console.error("Image delete failed:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = ProductRoute;
