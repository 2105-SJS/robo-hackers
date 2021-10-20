// Connect to DB
const { Client } = require('pg');
const DB_NAME = 'robo-hacker'
const DB_URL = process.env.DATABASE_URL || `postgres://localhost:5432/${ DB_NAME }`
const client = new Client(DB_URL);

const { 
  createProduct,
  getAllProducts,
  getProductById
} = require('./products');

const {
  createUser
} = require('./users');

const {
  createOrder
} = require('./orders');

const {
  createOrderProducts
} = require('./order_products');

// export
module.exports = {
  client,
  // db methods
  createProduct,
  createUser,
  createOrder,
  createOrderProducts,
  getAllProducts,
  getProductById
}