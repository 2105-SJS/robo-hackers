const express = require('express');
const ordersRouter = express.Router();
const {} = require('../db');
const { getOrderById, getAllOrders, createOrder, cancelOrder, updateOrder } = require('../db/orders');
const { requireUser } = require('./utils');
const {STRIPE_SECRET_KEY} = process.env;
const stripe = require("stripe")(STRIPE_SECRET_KEY);

const calculateOrderAmount = (items) => {
    //TO-DO return order total for checkout>>>>>>>>(Dummy being used)
    //calculate orer total on server to prevent tampering
    return 1400;
};

//POST /api/orders/create-payment-intent
ordersRouter.post("/create-payment-intent", async (req, res) => {
    const {items} = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: "usd",
        payment_method_types: [
           "card",
        ],
    });
    res.send ({
        clientSecret: paymentIntent.client_secret,
    });
});

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

ordersRouter.patch('/:orderId', requireUser, async (req, res, next) => {
    const {orderId} = req.params;
    const {status, userId} = req.body;

    try {
        //checking to make sure body is filled out
        if (!status && !userId) {
            throw ({
            name: "EmptyBodyError",
            message: "You must provide either status or userId in the body"
            })
        }

        const orderToPatch = await getOrderById(orderId);

        //checking to see if the order was made by the currently logged in user
        if (orderToPatch.userId === req.user.id) {
            //setting id to pass into updateOrder
            const id = orderId
            await updateOrder({id, status, userId})
            const newOrder = await getOrderById(orderId);
            res.send(newOrder);
        } else {
            throw ({
                name: "InvalidUserError",
                message: "You must be the owner of the order to make changes to it"
            })
        }

    } catch ({name, message}) {
        next ({name, message})
    }
})

ordersRouter.delete('/:orderId', requireUser, async (req, res, next) => {
    const {orderId} = req.params;

    try {
        const orderToDelete = await getOrderById(orderId);
        if (orderToDelete.userId === req.user.id) {
            const cancelledOrder = await cancelOrder(orderId);
            res.send(cancelledOrder);
        } else {
            throw ({
                name: "InvalidUserError",
                message: "You must be the owner of the order to make changes to it"
            })
        }

    } catch ({name, message}) {
        next ({name, message});
    }
})

module.exports = ordersRouter;