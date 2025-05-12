const pool = require("../config/postgres.config");
const ProductRoute = require("express").Router();
require("dotenv").config();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname.replaceAll(" ", "-")),
});
const upload = multer({ storage });
ProductRoute.get("/", async (req, res) => {
  const { category, sub_category } = req.query;
  const filters = req.query;
  let query = "SELECT id, name, price, images[1] as image, stock FROM products WHERE";
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
      return res.status(400).json({ message: "Invalid query" });
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

ProductRoute.get("/section/:slug", async (req, res) => {
  const { slug } = req.params;
  try {
    const ids = await pool.query("SELECT * FROM sections WHERE slug = $1", [
      slug,
    ]);
    if (ids.rowCount === 0)
      return res
        .status(404)
        .json({ message: `${slug} is not a valid section.` });
    const query = `
    SELECT p.id, p.name, p.price, p.images[1] AS image, sp.position as position
    FROM section_products sp
    JOIN sections s ON sp.section_id = s.id
    JOIN products p ON p.id = sp.product_id
    WHERE s.slug = $1 AND sp.product_id IS NOT NULL
    ORDER BY sp.position ASC
    LIMIT 4;

`;
    const response = await pool.query(query, [slug]);
    if (response.rowCount === 0)
      return res
        .status(404)
        .json({ message: `No products are currently there in ${slug}` });
    else return res.json(response.rows);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

ProductRoute.post("/", upload.array("images", 10), async (req, res) => {
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
  console.log(color_codes);
  const imagePaths = images.map(
    (image) => `${process.env.SELF_URL}/uploads/${image.filename}`
  );
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
});
module.exports = ProductRoute;
