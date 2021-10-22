const { client } = require('./client');

const createOrder = async ({status, userId, datePlaced}) => {
  try {
    const {rows: [order]} = await client.query(`
    INSERT INTO orders(status, "userId", "datePlaced")
    VALUES($1, $2, $3)
    RETURNING *
    `, [status, userId, datePlaced]);

    return order;
    
  } catch (error) {
    throw error
  }
}

const getOrderById = async (id) => {
  try {
    const {rows: [order]} = await client.query(`
    SELECT * from orders
    WHERE id = $1;
    `)
    return order;
  } catch (error) {
    throw error;
  }
}

getAllOrders = async () => {
  try {
    const {rows: orders} = await client.query(`
    SELECT * from orders;
    `);
    return orders;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createOrder,
  getOrderById,
  getAllOrders
}