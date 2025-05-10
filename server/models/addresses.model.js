module.exports = async function createAddressTable(client) {
  const query = `CREATE TABLE IF NOT EXISTS addresses (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    country TEXT DEFAULT 'India',
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    address_1 TEXT NOT NULL,
    address_2 TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    pincode INTEGER NOT NULL,
    contact TEXT NOT NULL
    )`;
  await client.query(query);
};
