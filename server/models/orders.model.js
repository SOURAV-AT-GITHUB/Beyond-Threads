module.exports = async function createOrdersTable(client) {
  const query = `CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    payment_id INTEGER REFERENCES payments(id),
    address_id INTEGER REFERENCES addresses(id),
    total_amount NUMERIC(10, 2) NOT NULL,
    final_amount NUMERIC(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CHECK (final_amount <= total_amount)
  );`;
  await client.query(query);
};
