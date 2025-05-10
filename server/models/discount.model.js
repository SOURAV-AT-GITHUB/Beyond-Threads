module.exports = async function createDiscountTable(client) {
  const query = `CREATE TABLE IF NOT EXISTS discounts (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE,
    min_cart_value NUMERIC(10,2) DEFAULT NULL,
    amount NUMERIC(10,2) NOT NULL
    );`;
  await client.query(query);
};
