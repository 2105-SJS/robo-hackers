const express = require('express');
const ordersRouter = express.Router();
const {} = require('../db');
const { getOrderById, getAllOrders, createOrder } = require('../db/orders');
const { requireUser } = require('./utils');

ordersRouter.use((req, res, next) => {
    next();
});

ordersRouter.get('/', async (req, res, next) => {
    try {
        const { isAdmin } = req.body;
        if (!isAdmin) {
            res.status(400)
            throw ({
                name: "Authentication failure error",
                message: "user is not administrator"
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


module.exports = ordersRouter;