const { client } = require('./client');

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

const updateOrderProducts = async (orderProductObject) => {
  const { price, id, quantity } = orderProductObject;
  try {
    const {rows: orderProductUpdate} = await client.query(`
    SELECT * from order_products JOIN orders ON order_products."orderId" = orders.id
    WHERE "orderId" = $1;
    `,[id])

    await client.query(`
    UPDATE order_products
    SET price = $2, quantity = $3
    WHERE id = $1;
    `, [id, price, quantity])
    
    return orderProductUpdate;
  } catch (error) {
    throw error
    
  }
}

const getOrderProductsByOrder = async ({id}) => {
  try {
    const {rows: orderProducts} = await client.query(`
    SELECT * FROM order_products
    WHERE "productId" = ${id};
    `)
    return orderProducts;
    
  } catch (error) {
    throw error
  }
}

const getOrderProductById = async (id) => {
  try {
    const {rows: orderProducts} = await client.query(`
    SELECT * FROM order_products
    WHERE id = $1;
    `, [id]);
    return orderProducts;
    
  } catch (error) {
    throw error
  }
}

const destroyOrderProduct = async(id) => {
  try {
    await client.query(`
    DELETE FROM order_products
    WHERE id=$1;
    `, [id]);
  } catch(error) {
    throw error
  }
}

const addProductToOrder = async ({ orderId, productId, price, quantity }) => {
  try {
    const { rows: orderProducts } = await client.query(`
      SELECT * FROM order_products
      WHERE "orderId" = $1;
    `, [orderId]);
    
    let productFound = false;
    for (let i = 0; i < orderProducts.length; i++ ) {
      if (productId === orderProducts[i].productId) {
        

        const newQuantity = orderProducts[i].quantity+quantity;
        const newPrice = parseFloat(orderProducts[i].price)+price;
        
        const updatedOrderProduct = { quantity: newQuantity, price: newPrice, id: orderProducts[i].id }
        await updateOrderProducts (updatedOrderProduct);
        productFound = true;
      }; 
    }; 
    if (productFound === false){
      await createOrderProducts ({productId, orderId, price, quantity});

    }
  } catch (error) {
    throw error;
  };
};

module.exports = {
  createOrderProducts,
  getOrderProductsByOrder,
  getOrderProductById,
  updateOrderProducts,
  addProductToOrder,
  destroyOrderProduct
}