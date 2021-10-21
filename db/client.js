// Connect to DB
const { Client } = require('pg');
const DB_NAME = 'robo-hacker'
const DB_URL = process.env.DATABASE_URL || `postgres://localhost:5432/${ DB_NAME }`
const client = new Client(DB_URL);

// export
module.exports = {
  client,
}