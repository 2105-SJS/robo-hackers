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

const updateOrderProducts = async ({ id, price, quantity }) => {
  try {
    const {rows: orderProductUpdate} = await client.query(`
    UPDATE order_products
    SET price = $2, quantity = $3
    WHERE "orderId" = $1;
    `, [id, price, quantity])
    return orderProductUpdate;
    
  } catch (error) {
    throw error
    
  }
}

const getOrderProductsByOrder = async ({id}) => {
  try {
    const {rows: orderProducts} = await client.query(`
    SELECT * from order_products
    WHERE "productId" = ${id};
    `)
    return orderProducts;
    
  } catch (error) {
    throw error
  }
}

module.exports = {
  createOrderProducts,
  getOrderProductsByOrder,
  updateOrderProducts
}