module.exports = async function createPaymentsTable(client) {
  const query = `CREATE TABLE IF NOT EXISTS payments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  razorpay_order_id VARCHAR(255) NOT NULL,
  razorpay_payment_id VARCHAR(255) UNIQUE NOT NULL,
  razorpay_signature TEXT NOT NULL,
  amount INTEGER NOT NULL, -- In paisa
  contact TEXT NOT NULL,
  email VARCHAR(255) NOT NULL,
  receipt_id VARCHAR(255),
  paid_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;
  await client.query(query);
};
