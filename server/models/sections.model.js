module.exports = async function createSectionsTable(client) {
  const query = `CREATE TABLE IF NOT EXISTS sections (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE,
    slug TEXT UNIQUE
    );`;
  await client.query(query);
};
