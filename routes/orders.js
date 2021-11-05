const express = require('express');
const ordersRouter = express.Router();
const { getProductById } = require('../db');
const { getOrderById, getAllOrders, createOrder } = require('../db/orders');
const { requireUser } = require('./utils');

ordersRouter.get('/', async (req, res, next) => {
    try {
        const { isAdmin } = req.body;
        if (!isAdmin) {
            res.status(400)
            throw ({
                name: "Authentication failure error",
                message: "user is not administerator"
            })
        }
        const orders = await getAllOrders();
        

        res.send(orders);
    } catch ({name, message}) {
        next ({name, message});
    };
});

ordersRouter.post('/', async (req, res, next) => {
    try {
        const { status, userId, datePlaced } = req.body;
        const order = createOrder({ status, userId, datePlaced });
        res.send(order);
    } catch (error) {
        next (error);
    };
});

ordersRouter.get('/cart', requireUser, async (req, res, next) => {
    const { id } = req.body;
    try {
        const userOrders = await getOrdersByUser (id);
        const userCart = userOrders.filter(order => order.status = "created");
        res.send (userCart)
    } catch (error) {
        throw (error);
    }
});

ordersRouter.post('/:orderId/products', requireUser, async (req, res, next) => {
    const { orderId } = req.params;
    const { productId, quantity } = req.body;
    try {
        const order = await getOrderById(orderId);
        const product = await getProductById(productId);
        
    } catch (error) {
        
    }
})


module.exports = ordersRouter;