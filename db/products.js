const { client } = require('./index');

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

module.exports = {
  createProduct
}