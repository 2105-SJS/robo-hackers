const { client } = require('./client');

const createProduct = async ({name, description, price, imageURL, inStock, category}) => {
  if (!imageURL) {
    imageURL = "placeholder picture";
  }
  
  try {
    const {rows: [product] } = await client.query(`
    INSERT INTO products(name, description, price, "imageURL", "inStock", "category")
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
    `, [name, description, price, imageURL, inStock, category]);
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

const updateProduct = async ({ id, name, description, price, imageURL, inStock, category }) => {
  try {
    const { rows: [product] } = await client.query(`
      UPDATE products 
      SET name = $1,
      description = $2,
      price = $3,
      "imageURL" = $4,
      "inStock" = $5,
      category = $6
      WHERE id = $7
      RETURNING *;
    `, [name, description, price, imageURL, inStock, category, id]);
    return product;
  } catch (error) {
    throw error;
  }
}

const destroyProduct = async (id) => {
  try {
    const { rows: order_products } = await client.query(`
    DELETE FROM order_products
    WHERE "productId" = $1
    AND "orderId" NOT IN
    (SELECT orders.id FROM orders
      JOIN order_products ON orders.id = order_products."orderId"
      WHERE orders.status = 'completed'
      AND order_products."productId" = $1)
      RETURNING *;
      `, [id]);

      const { rows: review} = await client.query(`
       DELETE FROM reviews
       WHERE "productId" =$1;
      `,[id]);
      
      const { rows: product } = await client.query(`
        DELETE FROM products
        WHERE id = $1
        RETURNING *;
      `, [id]);
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
  updateProduct,
  destroyProduct
}