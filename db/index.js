// Connect to DB
const { Client } = require('pg');
const DB_NAME = 'robo-hacker'
const DB_URL = process.env.DATABASE_URL || `postgres://localhost:5432/${ DB_NAME }`
const client = new Client(DB_URL);

// database methods

const createProduct = async ({description, price, imageURL, inStock, category}) => {
  try {
    const {rows: [product] } = await client.query(`
    INSERT INTO products(description, price, "imageURL", "inStock", "category")
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
    `, [description, price, imageURL, inStock, category]);
    return product;
  } catch (error) {
    throw error
  }
  
}
//again

const createUser = async ({firstName, lastName, email, imageURL, username, password, isAdmin}) => {
  try {
    const {rows: [user] } = await client.query(`
    INSERT INTO users("firstName", "lastName", email, "imageURL", username, password, "isAdmin")
    VALUES($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
    `, [firstName, lastName, email, imageURL, username, password, isAdmin]);
    return user;
    
  } catch (error) {
    throw error
  }
}

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

/*-----------PRODUCTS-----------*/

const getAllProducts = async () => {
  try {
    const {rows: products} = await client.query(`
      SELECT *
      FROM products;
    `);
    return products;
  } catch (error) {
    throw error;
  }
}

const getProductById = async (productId) => {
  try {
    const {rows: [product]} = await client.query(`
      SELECT * 
      FROM products
      WHERE id = $1
    `, [productId]);
    return product;
  } catch (error) {
    throw error;
  }
}

// export
module.exports = {
  client,
  // db methods
  createProduct,
  createUser,
  createOrder,
  createOrderProducts,
  getAllProducts,
  getProductById
}