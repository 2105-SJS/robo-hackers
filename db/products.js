const { client } = require('./client');

const createProduct = async ({description, price, imageURL, inStock, category}) => {
  try {
    const {rows: [product] } = await client.query(`
    INSERT INTO products(description, price, "imageURL" = 'https://cdn.britannica.com/18/137318-050-29F7072E/rooster-Rhode-Island-Red-roosters-chicken-domestication.jpg', "inStock", "category")
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
    `, [description, price, imageURL, inStock, category]);
    return product;
  } catch (error) {
    throw error
  }
  
}

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
      WHERE id = $1;
    `, [productId]);
    return product;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById
}