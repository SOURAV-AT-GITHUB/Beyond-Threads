module.exports = async function createAdminTable(client) {
  const query = `CREATE TABLE IF NOT EXISTS admin (
    email VARCHAR(255) PRIMARY KEY NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name TEXT
    )`;
  await client.query(query);
};
