const { client } = require('./client');

const createProduct = async ({description, price, imageURL, inStock, category}) => {

  if (!imageURL) {
    imageURL = "placeholder picture";
  }
  
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
const reviewProduct = async ({title, content, stars, userId, productId}) => {
  try {
    const {rows: productReview} = await client.query(`
    INSERT INTO reviews (title, content, stars, "userId", "productId")
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
    `, [ title, content, stars, userId, productId])

    return productReview
  } catch (error) {
    throw error
  }
}



const updateProduct = async ({ id, description, price, imageURL, inStock, category }) => {
  try {
    const { rows: [product] } = await client.query(`
      UPDATE products 
      SET description = $1,
      price = $2,
      "imageURL" = $3,
      "inStock" = $4,
      category = $5
      WHERE id = $6
      RETURNING *;
    `, [description, price, imageURL, inStock, category, id]);
    return product;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  reviewProduct,
  updateProduct
}