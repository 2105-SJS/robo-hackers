const express = require('express');
const productsRouter = express.Router();

const { getAllProducts, getProductById, createProduct, destroyProduct, getOrdersByProduct, updateProduct } = require('../db/index');

const { requireAdmin } = require('./utils');

productsRouter.use((req, res, next) => {
    next();
});

productsRouter.get('/', async (req, res, next) => {
    try {
        const products = await getAllProducts();
        res.send(products)
    } catch (error) {
        next (error);
    };
});

productsRouter.get('/:productid', async (req, res, next) => {

    try {
        const {productid} = req.params;
        const product = await getProductById(productid);
        res.send(product)
    } catch (error) {
        next (error)
    };
});

productsRouter.post('/', async (req, res, next) => {
    try {
        const {name, description, price, inStock, imageURL, category } = req.body;
        const createdProduct = await createProduct({name, description, price, inStock, imageURL, category});
        res.send(createdProduct);
    } catch (error) {
        next (error);
    }
});



productsRouter.patch('/:productId', requireAdmin, async(req, res, next) => {
    const {productId} = req.params;
    const {name, description, price, imageURL, inStock, category} = req.body;

    try {
        const updatedProduct = await updateProduct({id:productId, name, description, price, imageURL, inStock, category});
        console.log(updatedProduct);
        res.send(updatedProduct);
    } catch ({name, message}) {
        next ({name, message})
    }
})

productsRouter.delete('/:productId', requireAdmin, async (req, res, next) => {
    try {
        const { productId } = req.params;
        const destroyedProducts = await destroyProduct(productId);
        res.send(destroyedProducts);
    } catch (error) {
        next(error);
    }
});

productsRouter.get('/:productId/orders', requireAdmin, async (req, res, next) => {
    try {
        const { productId } = req.params;
        const allOrdersByProduct = await getOrdersByProduct(productId);
        res.send(allOrdersByProduct);
    } catch (error) {
        next(error);
    }
});


module.exports = productsRouter;