module.exports = async function createSectionProductsTable(client) {
  const query = `CREATE TABLE IF NOT EXISTS section_products (
  id SERIAL PRIMARY KEY,
  section_id INTEGER REFERENCES sections(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id) ON DELETE SET NULL,
  position INT NOT NULL CHECK (position >= 1),
  UNIQUE (section_id, product_id)
);
`;
await client.query(query)
};
