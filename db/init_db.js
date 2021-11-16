// code to build and initialize DB goes here
const {
  client
  // other db methods 
} = require('./client');

const {
  createProduct,
  createUser,
  getUserByUsername,
  getUserById,
  getAllUsers,
  getUser,
  createOrder,
  createOrderProducts,
  getAllProducts,
  getProductById,
  getOrdersByProduct,
  getCartByUser,
  getOrdersByUser,
  updateOrder,
  addProductToOrder,
  destroyOrderProduct,
  reviewProduct,
  destroyProduct
} = require('./index.js');
const { getOrderProductById } = require('./order_products');
const { updateProduct } = require('./products');


async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order
    console.log('Dropping All Tables......');
    await client.query(`
      DROP TABLE IF EXISTS order_products;
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS reviews;
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS products;
    `);
    console.log('Finished Dropping Tables-----');
  

    // build tables in correct order
    console.log('Creating All Tables......');
    await client.query(`

      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        price NUMERIC(10, 2) NOT NULL,
        "imageURL" VARCHAR(255) NOT NULL,
        "inStock" BOOLEAN DEFAULT false,
        "category" VARCHAR(255) NOT NULL,
        active BOOLEAN DEFAULT true
      );
      
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        "firstName" VARCHAR(255) NOT NULL,
        "lastName" VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        "imageURL" VARCHAR(255) NOT NULL,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) UNIQUE NOT NULL,
        "isAdmin" BOOLEAN NOT NULL DEFAULT false
      );

      CREATE TABLE orders (
        id SERIAL PRIMARY KEY,
        status VARCHAR(255) NOT NULL,
        "userId" INTEGER REFERENCES users(id),
        "datePlaced" VARCHAR(255) NOT NULL
      );

      Create Table order_products (
         id SERIAL PRIMARY KEY,
         "productId" INTEGER REFERENCES products(id),
         "orderId" INTEGER REFERENCES orders(id),
         price NUMERIC(10, 2) NOT NULL,
         quantity INTEGER NOT NULL,
         UNIQUE ("productId", "orderId")
      );

      CREATE TABLE reviews (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content VARCHAR(60) NOT NULL,
        stars INTEGER CHECK (stars BETWEEN 0 AND 5),
        "userId" INTEGER REFERENCES users(id),
        "productId" Integer REFERENCES products(id)
      );
    `);

    console.log('Finished Creating Tables--------');
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  console.log('Starting to create users...');
  try {
    const usersToCreate = [
      {firstName: 'chicken', lastName: 'sandwich', email: 'chickenSandwich@gmail.com', imageURL:'chicken', username:'chicken555', password:'sandwich555', isAdmin: false},
      {firstName: 'dinosaur', lastName: 'sandwich', email: 'dinosaurSandwich@gmail.com', imageURL:'dinosaur', username:'dinosaur555', password:'sandwich555', isAdmin: false},
      {firstName: 'bruce', lastName: 'wayne', email: 'darkKnight@gmail.com', imageURL:'batman', username:'batman555', password:'sandwich555', isAdmin: true}
      
    ]
    const users = await Promise.all(usersToCreate.map(createUser));

    console.log('UsersCreated:');
    console.log(users);
    console.log('Finished creating users!');
  } catch (error) {
    console.error('Error creating users');
    throw error;
  }

  console.log('Starting to create products...');
  try {
    const productsToCreate = [
      {name:"ASUS ROG Strix NVIDIA GeForce RTX 3080 Ti OC Edition Gaming Graphics Card", description: "(PCIe 4.0, 12GB GDDR6X, HDMI 2.1, Axial-tech Fan Design, 2.9-Slot, Super Alloy Power II, ASUS Auto-Extreme Technology)", price: 2678.93, imageURL:"https://c1.neweggimages.com/ProductImageCompressAll1280/14-126-508-V19.jpg", inStock: true, category: "graphics card"},
      {name:"GIGABYTE AORUS GeForce RTX 3070 MASTER", description: "8GB GDDR6 PCI Express 4.0 ATX Video Card GV-N3070AORUS M-8GD (rev. 2.0) (LHR)", price: 1205.39, imageURL:'https://c1.neweggimages.com/ProductImageCompressAll1280/14-932-466-V01.jpg', inStock: false, category: "graphics card"},
      {name:"MSI Suprim GeForce RTX 3070", description: "8GB GDDR6 PCI Express 4.0 x16 Video Card RTX 3070 Suprim X 8G LHR", price: 1137.85, imageURL: "https://c1.neweggimages.com/ProductImageCompressAll1280/14-137-668-V03.jpg", inStock: true, category: "graphics card"},
      {name:"ASUS ROG Strix NVIDIA GeForce RTX 3070 V2 White OC Edition Gaming Graphics Card", description: "(PCIe 4.0, 8GB GDDR6, LHR, HDMI 2.1, DisplayPort 1.4a, White Color Scheme, Axial-tech Fan Design, 2.9-slot)", price: 1329.49, imageURL: "https://c1.neweggimages.com/ProductImageCompressAll1280/14-126-535-V01.jpg", inStock: true, category: "graphics card"},
      {name:"Mobile Suit Gundam 00 GN-0000-GNR-010 00 Raiser Real Grade Model Kit", description: "Utilizing real world technology to interpret the futuristic elements of the Gundam universe, the Real Grade series presents its version of the 00 Raiser from the Gundam 00 animated series.", price: 29.74, imageURL: "https://media.gamestop.com/i/gamestop/11122494/Mobile-Suit-Gundam-00-GN-0000-GNR-010-00-Raiser-Real-Grade-Model-Kit?$pdp$$&fmt=webp", inStock: true, category: "collectible"},
      {name:"Mobile Suit Gundam Calamity Full Mechanics Grade Model Kit", description: "The Calamity Gundam from MS Gundam Seed, a series popular among fans will be available and joins the new format series Full Mechanics.", price: 51.84, imageURL: "https://media.gamestop.com/i/gamestop/11118817/Mobile-Suit-Gundam-Calamity-Full-Mechanics-Grade-Model-Kit?$pdp$$&fmt=webp", inStock: true, category: "collectibles"},
      {name:"Bandai Mobile Suit Gundam Wing XXXG-01H Gundam Heavyarms Gundam Universe 6.69-in Action Figure", description: "The figure perfectly captures its heavy look and signature massive Gatling cannons.", price: 24.99, imageURL: "https://media.gamestop.com/i/gamestop/11146483/Bandai-Mobile-Suit-Gundam-Wing-XXXG-01H-Gundam-Heavyarms-Gundam-Universe-6.69-in-Action-Figure?$pdp$$&fmt=webp", inStock: false, category: "collectibles"},
      {name:"Bandai Gundam Wing Infinity 4.5-in Action Figure", description: "The iconic world of Gundam comes to life in this exciting 4.5 inch build a figure. With exceptional detail- these figures are the perfect addition to any Gundam Collection.", price: 11.04, imageURL: "https://media.gamestop.com/i/gamestop/11148531/Bandai-Gundam-Wing-Infinity-4.5-in-Action-Figure?$pdp$$&fmt=webp", inStock: true, category: "collectibles"}

    ]

    const products = await Promise.all(productsToCreate.map(createProduct))

    console.log("Products created:");
    console.log(products);
    console.log('Finished creating products');
  } catch(error) {
    console.error('Error creating products');
    throw(error);
  }

  console.log('Starting to create orders....');
  try {
    const ordersToCreate = [
      {userId: 2, status:'created', datePlaced:'10/24/2021'},
      {status: 'created', userId: 1, datePlaced:'5/2/1996'},
      {status: 'completed', userId: 1, datePlaced:'2/2/2022'},
      {userId: 3, datePlaced:'12/24/1995', status:'created'}
    ]

    const orders = await Promise.all(ordersToCreate.map(createOrder))

    console.log('Orders created:')
    console.log(orders);
    console.log('Finished creating orders');
  } catch(error) {
    console.error('Error creating order');
    throw(error);
  }

  console.log('Starting to create order_products....');
  try {
    const order_productsToCreate = [
      {productId: 1, orderId: 1, price: 120.88, quantity: 50},
      {productId: 3, orderId: 2, price: 120398.23, quantity: 7},
      {productId: 4, orderId: 4, price: 200, quantity: 2},
      {productId: 5, orderId: 4, price: 50, quantity: 1},
      {productId: 2, orderId: 4, price: 35, quantity: 3}

    ]

    const order_products = await Promise.all(order_productsToCreate.map(createOrderProducts))

    console.log('OrderProducts created:')
    console.log(order_products);
    console.log('Finished creating orderProducts');
  } catch(error) {
    throw(error);
  }

  console.log('Creating reviews...');
  try {
    const createReviews = [
      { title: 'Verygood!', content: 'really helpful product', stars: 4, userId: 1, productId: 1},
      { title: 'Its Okay.', content: 'it does what its supposed to at least', stars: 3, userId: 1, productId: 3},
      { title: 'Not the best', content: 'wouldnt recommend', stars: 1, userId: 2, productId: 1}
    ]
    const demoReviews = await Promise.all( createReviews.map(reviewProduct))
    console.log("reviews created: ");
    console.log(demoReviews);
    console.log('finished creating reviews');
  } catch (error) {
    throw(error);
  }
  

  console.log('Testing User Methods');
  try {
    console.log("Testing getUserByUsername")
    const testUserOne = await getUserByUsername('chicken555');
    console.log(testUserOne);

    console.log("Testing getUserById");
    const testUserTwo = await getUserById(2);
    console.log(testUserTwo);

    console.log("Testing getUser");
    const testUserThree = await getUser({username: 'dinosaur555', password: 'sandwich555'});
    console.log(testUserThree);

    console.log("Testing getUser, expecting nothing");
    const testUserFour = await getUser({username: 'dinosaur555', password: 'chicken'})
    console.log(testUserFour);

    console.log("Testing getAllUsers");
    const testUserListOne = await getAllUsers();
    console.log(testUserListOne);

  } catch(error){
    console.error('Error testing user methods');
  }

  console.log('------------------------------------------------------------');
  console.log('Testing Product Methods');
  try {
    console.log("Testing getAllProducts");
    const testProductListOne = await getAllProducts();
    console.log(testProductListOne);

    console.log("Testing getProductById");
    const testProductOne = await getProductById(1);
    console.log(testProductOne);

  } catch(error) {
    throw(error);
  }
  try {
   const cart = await getCartByUser(1);
    console.log('cart>>>>>>>>>>', cart)
  } catch (error) {
    throw error;
  }


  try {
    const userIdOrders = await getOrdersByUser(1);
    console.log('user>>>>>>', userIdOrders);
  } catch (error) {
  throw error;
  }

  try {
    const id = 1
    const status = 'completed'
    const userId = 2
    await updateOrder({ id, status, userId });
  } catch (error) {
    throw error;
  }

  try {
    console.log('testing addProductToOrder function')
    
    const orderId = 2
    const productId = 1
    const price = 2034
    const quantity = 1223
    await addProductToOrder ({ productId, orderId, price, quantity })
    console.log('addProductToOrder>>>>', productId, orderId, price, quantity);
  } catch (error) {
    throw error;
  }
}
  


buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());