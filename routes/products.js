const express = require('express');
const productsRouter = express.Router();
const { getAllProducts, getProductById } = require('../db');

productsRouter.get('/', async (req, res, next) => {
    try {
        const products = await getAllProducts();
        res.send(products)
    } catch (error) {
        next (error);
    };
});



products.get('/:productid', async (req, res, next) => {
    try {
        const {productId} = req.params;
        const product = await getProductById(productId);
        res.send(product)
    } catch (error) {
        next (error)
    };
});

module.exports = productsRouter;