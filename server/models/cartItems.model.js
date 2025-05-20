module.exports = async function createCartItemTable(client) {
  const query = `CREATE TABLE IF NOT EXISTS cart_items (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
    UNIQUE(user_id, product_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`;
  await client.query(query);
};
