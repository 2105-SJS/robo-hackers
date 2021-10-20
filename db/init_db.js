// code to build and initialize DB goes here
const {
  client
  // other db methods 
} = require('./index');

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order
    console.log('Dropping All Tables......');
    await client.query(`
      DROP TABLE IF EXISTS order_products;
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS products;
    `);
    console.log('Finished Dropping Tables-----');
  

    // build tables in correct order
    console.log('Creating All Tables......');
    await client.query(`

      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        description VARCHAR(255) NOT NULL,
        price NUMERIC(10, 2) NOT NULL,
        "imageURL" VARCHAR(255) DEFAULT 'https://cdn.britannica.com/18/137318-050-29F7072E/rooster-Rhode-Island-Red-roosters-chicken-domestication.jpg',
        "inStock" BOOLEAN DEFAULT false,
        "category" VARCHAR(255) NOT NULL
      );
      
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        "firstName" VARCHAR(255) NOT NULL,
        "lastName" VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        "imageURL" VARCHAR(255) DEFAULT 'https://cdn.britannica.com/18/137318-050-29F7072E/rooster-Rhode-Island-Red-roosters-chicken-domestication.jpg',
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) UNIQUE NOT NULL,
        "isAdmin" BOOLEAN NOT NULL DEFAULT false
      );

      CREATE TABLE orders (
        id SERIAL PRIMARY KEY,
        status VARCHAR(255) DEFAULT 'created',
        "userId" INTEGER REFERENCES users(id),
        "datePlaced" VARCHAR(255) NOT NULL
      );

      Create Table order_products (
         id SERIAL PRIMARY KEY,
         "productId" INTEGER REFERENCES products(id),
         "orderId" INTEGER REFERENCES orders(id),
         price NUMERIC(10, 2) NOT NULL,
         quantity INTEGER NOT NULL
      );
    `);

    console.log('Finished Creating Tables--------');
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());