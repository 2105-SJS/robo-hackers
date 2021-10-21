const { 
  createProduct,
  getAllProducts,
  getProductById
} = require('./products');

const {
  createUser,
  getUserByUsername,
  getUserById,
  getAllUsers,
  getUser
} = require('./users');

const {
  createOrder
} = require('./orders');

const {
  createOrderProducts
} = require('./order_products');

// export
module.exports = {
  // db methods
  createProduct,
  createUser,
  getUserByUsername,
  getUserById,
  getAllUsers,
  getUser,
  createOrder,
  createOrderProducts,
  getAllProducts,
  getProductById
}