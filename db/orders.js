const { client } = require('./client');

const { getProductById } = require("./products");
const { getOrderProductsByOrder} = require("./order_products");

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

const _attachProducts = async (id) => {
  const order = await getOrderById(id);
  const allOrderProducts = await getOrderProductsByOrder({id: order.id});

  order.products = []
  await Promise.all(allOrderProducts.map(async(orderProduct) => {
      const product = await getProductById(orderProduct.productId);
      product.price = orderProduct.price;
      product.quantity = orderProduct.quantity;
      const {id, name, description, price, quantity} = product;
      const productColumns = {price, description, quantity, id, name};
      order.products.push(productColumns);
      return product;
  }));

//<<<<<<<<<<<
//This should get all orders in general
//Can make a helper function that should grab all orders with their products by specific user

};

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

const getAllOrders = async () => {
  try {
    const {rows: orders} = await client.query(`
    SELECT * from orders;
    `);

    const attachProductsToOrder = await Promise.all(orders.map(async(order) => {
      const attachedOrder = await _attachProducts(order.id);
      return attachedOrder;
    }));
    return attachProductsToOrder;
  } catch (error) {
    throw error;
  }
}

const getOrdersByUser = async ({id}) => {
  try {
    const {rows: [user]} = await client.query(`
    SELECT * FROM users
    WHERE id = $1;
    `, [id]);

    const {rows: orders} = await client.query(`
    SELECT * from orders
    WHERE "userId" = $1;
    `, [user.id]);
    delete user.password;
    const attachProductsToOrder = await Promise.all(orders.map(async(order) => {
      const attachedOrder = await _attachProducts(order.id);
      return attachedOrder;
    }));
    return attachProductsToOrder;

    
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createOrder,
  getOrderById,
  getAllOrders,
  getOrdersByUser
}