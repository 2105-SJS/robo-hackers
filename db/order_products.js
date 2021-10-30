const { client } = require('./client');

const createOrderProducts = async ({productId, orderId, price, quantity}) => {
  try {
    const {rows: [orderProduct]} = await client.query(`
    INSERT INTO order_products("productId", "orderId", price, quantity)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `, [productId, orderId, price, quantity]);
    return orderProduct;
  } catch (error) {
    throw error;
  }
}

const getOrderProductsByOrder = async ({id}) => {
  try {
    const {rows: orderProducts} = await client.query(`
    SELECT * FROM order_products
    WHERE "productId" = ${id};
    `)
    return orderProducts;
    
  } catch (error) {
    throw error
  }
}

const getOrderProductById = async (id) => {
  try {
    const {rows: orderProducts} = await client.query(`
    SELECT * FROM order_products
    WHERE id = $1;
    `, [id]);
    return orderProducts;
    
  } catch (error) {
    throw error
  }
}

module.exports = {
  createOrderProducts,
  getOrderProductsByOrder,
  getOrderProductById
}