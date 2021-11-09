const { 
  createProduct,
  getAllProducts,
  getProductById,
  destroyProduct
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
  updateOrderProducts,
  addProductToOrder,
  destroyOrderProduct
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
  updateOrder,
  addProductToOrder,
  destroyOrderProduct
}