const { client } = require('./client');

const createOrder = async ({status, userId, datePlaced}) => {
  try {
    const {rows: [order]} = await client.query(`
    INSERT INTO orders(status, "userId", "datePlaced")
    RETURNING *;
    `, [status, userId, datePlaced]);
    return order;
    
  } catch (error) {
    throw error
  }
}

module.exports = {
  createOrder
}