const express = require('express');
const productsRouter = express.Router();
const { getAllProducts, getProductById, createProduct} = require('../db/index');
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

productsRouter.post('/', requireAdmin, async (req, res, next) => {
    try {
        const { description, price, inStock, imageURL, category } = req.body;
        const createdProduct = await createProduct({ description, price, inStock, imageURL, category});
        res.send(createdProduct);
    } catch (error) {
        next (error);
    }
});

module.exports = productsRouter;