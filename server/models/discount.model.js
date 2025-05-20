module.exports = async function createDiscountTable(client) {
  const query = `CREATE TABLE IF NOT EXISTS discounts (
    id SERIAL PRIMARY KEY,
    code TEXT UNIQUE,
    type TEXT CHECK (type IN ('fixed', 'percentage')), 
    for_first_order BOOLEAN DEFAULT FALSE,
    min_cart_value NUMERIC(10,2) DEFAULT 0.0,
    max_cart_value NUMERIC(10,2) DEFAULT NULL,
    discount_value NUMERIC(10,2) NOT NULL
    );`;
  await client.query(query);
};
