const pool = require("../config/postgres.config");

module.exports = async function createProductTable() {
  const query = `CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY NOT NULL UNIQUE,
    name TEXT NOT NULL,
    stock INTEGER NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    color_name TEXT NOT NULL,
    color_codes TEXT[] NOT NULL,
    pattern TEXT NOT NULL,
    care TEXT NOT NULL,
    category TEXT NOT NULL, 
    sub_category TEXT NOT NULL,
    product_type TEXT NOT NULL,
    length TEXT NOT NULL,
    blouse_piece TEXT NOT NULL,
    fabric TEXT,
    blouse TEXT,
    disclaimer TEXT NOT NULL,
    sku TEXT NOT NULL,
    what_you_will_receive TEXT NOT NULL,
    description TEXT NOT NULL,
    note TEXT NOT NULL,
    images TEXT[] CHECK (array_length(images, 1) <= 10)
        )`;
  await pool.query(query);
}
