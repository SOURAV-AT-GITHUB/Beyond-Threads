module.exports = async function createOrderDiscountTable(client) {
  const query = `CREATE TABLE IF NOT EXISTS order_discount (
    id SERIAL PRIMARY KEY,
    discount_id INTEGER REFERENCES discounts(id),
    order_id INTEGER REFERENCES discounts(id),
    UNIQUE(discount_id,order_id)
    )`;
  await client.query(query);
};
