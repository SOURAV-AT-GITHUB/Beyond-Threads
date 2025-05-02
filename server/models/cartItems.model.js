const pool = require("../config/postgres.config");

module.exports = async function createCartItemsTable() {
  const query = `CREATE TABLE IF NOT EXISTS cart_items (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    UNIQUE(user_id, product_id)
    );`;
  await pool.query(query);
};
