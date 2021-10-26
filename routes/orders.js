const express = require('express');
const ordersRouter = express.Router();
const {} = require('../db');
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
    console.log('req.body', req.body);
    try {
        const order = createOrder(req.body);
        res.send(order);
    } catch (error) {
        next (error);
    };
});


module.exports = ordersRouter;