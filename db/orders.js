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

const completeOrder = async (id) => {
  try {
    const {rows: finishedOrder} = await client.query(`
    UPDATE orders
    SET status = 'completed'
    WHERE id = $1;
    `, [id]);
    return finishedOrder;
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

const cancelOrder = async (id) => {
  try {
    const {rows: [orderCancelled]} = await client.query(`
    UPDATE orders
    SET status = 'cancelled'
    WHERE id = $1
    RETURNING *;
    `, [id]);

    return orderCancelled;
  } catch (error) {
    throw error
  }
};

const getOrderById = async (id) => {
  try {
    const {rows: [order]} = await client.query(`
    SELECT * from orders
    WHERE id = $1;
    `, [id])
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

const getOrdersByUser = async (id) => {
  try {
    // const {rows: userOrders} = await client.query(`
    // SELECT users.username, users.email, orders.status, orders."datePlaced", op.price, op.quantity, p.description, p.price 
    // FROM users
    // JOIN orders ON users.id = orders."userId"
    // JOIN order_products AS op ON orders.id = op."orderId"
    // JOIN products AS p ON op."productId" = p.id
    // WHERE users.id = $1;
    // `, [id]);
    // return userOrders;

    const {rows: userOrders} = await client.query(`
    SELECT * FROM orders
    WHERE "userId"=$1;
    `,[id])





    return userOrders;
    
  } catch (error) {
    throw error;
  }
}

const getOrdersByProduct = async (id) => {
  try {
    const {rows: ordersByProduct} = await client.query(`
    SELECT orders.id AS OrderID, orders.status, orders."datePlaced", orders."userId", products.description, products.price
    FROM orders
    JOIN order_products ON orders.id = order_products."orderId"
    JOIN products ON products.id = order_products."productId"
    WHERE "productId" = $1;
    `, [id]);

    return ordersByProduct;
  } catch (error) {
    throw(error)
  }
}

const getCartByUser = async (id) => {
  try {
    const {rows: userCart} = await client.query(`
    SELECT users.username, users.email, orders.status, orders."datePlaced", order_products.quantity, order_products.price
    FROM users
    JOIN orders ON users.id = orders."userId"
    LEFT JOIN order_products ON orders.id = order_products."orderId"
    WHERE users.id = $1;
    `,[id])
    return userCart;
    

  } catch (error) {
    throw error
  }
}

const updateOrder = async ({id, status, userId}) => {
  try {

    if (status) {
      await client.query(`
      UPDATE orders
      SET status = $1
      WHERE id = $2;
      `,[status, id])
    }

    if (userId) {
      await client.query(`
      UPDATE orders
      SET "userId" = $1
      WHERE id = $2;
      `,[userId, id])
    }

    const order = await getOrderById(id);
    return order;

  } catch (error) {
    throw error;
  };
};


module.exports = {
  createOrder,
  getOrderById,
  getAllOrders,
  getOrdersByUser,
  getOrdersByProduct,
  getCartByUser,
  cancelOrder,
  completeOrder,
  updateOrder
}