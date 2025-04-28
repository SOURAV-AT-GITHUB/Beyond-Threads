const pool = require("../config/postgres.config")

async function createAdminTable(){
    const query = `CREATE TABLE IF NOT EXISTS admins (
    email VARCHAR(255) PRIMARY KEY NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name TEXT
    )`

    await pool.query(query)
}
module.exports = createAdminTable