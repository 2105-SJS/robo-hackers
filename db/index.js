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
  createOrder,
  getOrdersByProduct,
  getCartByUser,
  getOrderById,
  getAllOrders,
  getOrdersByUser,
  completeOrder,
  cancelOrder,
  updateOrder
} = require('./orders');

const {
  createOrderProducts,
  getOrderProductsByOrder,
  getOrderProductById,
  updateOrderProducts
} = require('./order_products');

// export
module.exports = {
  // db methods
  createProduct,
  getAllProducts,
  getProductById,
  createUser,
  getUserByUsername,
  getUserById,
  getAllUsers,
  getUser,
  createOrder,
  getOrderById,
  getAllOrders,
  getOrdersByUser,
  completeOrder,
  createOrderProducts,
  getOrdersByProduct,
  getCartByUser,
  cancelOrder,
  getOrderProductsByOrder,
  getOrderProductById,
  updateOrderProducts,
  updateOrder
}