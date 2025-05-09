const pool = require("../config/postgres.config");

module.exports = async function createDiscountTable() {
  const query = `CREATE TABLE IF NOT EXISTS discounts (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE,
    min_cart_value NUMERIC(10,2) DEFAULT NULL,
    amount NUMERIC(10,2) NOT NULL
    );`;
  await pool.query(query);
};
