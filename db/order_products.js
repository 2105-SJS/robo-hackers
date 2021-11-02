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
    SELECT * from order_products JOIN orders ON order_products."orderId" = orders.id
    WHERE "orderId" = $1;
    `,[id])

    await client.query(`
    UPDATE order_products
    SET price = $2, quantity = $3
    WHERE "productId" = $1;
    `, [product.id, price, quantity])
    
    return orderProductUpdate;
  } catch (error) {
    throw error
    
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
  getOrderProductById,
  updateOrderProducts

}