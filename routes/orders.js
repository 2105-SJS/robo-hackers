const express = require('express');
const ordersRouter = express.Router();
const { getOrderById, getAllOrders, createOrder, cancelOrder, updateOrder, getProductById, addProductToOrder, getOrderProductsByOrder, getAllOrderProducts, updateOrderProducts } = require('../db/index');
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
    } catch ({name, message}) {
        next ({name, message});
    };
});

ordersRouter.get('/cart', requireUser, async (req, res, next) => {
    const { id } = req.body;
    try {
        const userOrders = await getOrdersByUser (id);
        const userCart = userOrders.filter(order => order.status = "created");
        res.send (userCart)
    } catch ({name, message}) {
        next({name, message});
    }
});

ordersRouter.post('/:orderId/products', requireUser, async (req, res, next) => {
    const {orderId} = req.params;
    const {id, quantity, price} = req.body;
    const user = req.user

    try {
        //check to see if product id was provided 
        if (!id) {
            throw ({
                name: "MissingBodyRequirementError",
                message: "Fetch call body must include a product id"
            })
        }

        const productToAdd = await getProductById(id);
        //check to see if a product with that id exists
        if (!productToAdd) {
            throw({
                name:"ProductNotFoundError",
                message:"No product with that id exists"
            })
        }

        const orderToAddTo = await getOrderById(orderId);
        
        if (req.user.id === orderToAddTo.userId) {
            const {price} = productToAdd
            let quantity = 1
            const productId = id;
            let productInOrder = false;
            let updatedOrder_product = {}

            //get all of the order products
            const order_products = await getAllOrderProducts();
            //iterate through them
            for (let i = 0; i < order_products.length; i++) {
                //if orderId and productId match the order and product id in the given order_product,
                //it means we have a duplicate, so we call updateOrderProducts instead of addProductToOrder
                if (parseInt(orderId) === order_products[i].orderId && parseInt(productId) === order_products[i].productId) {
                    productInOrder = true;
                    //calculate new quantity and price for the updated order_product object
                    const newQuantity = 1 + order_products[i].quantity;
                    const newPrice = productToAdd.price * newQuantity
                    const newOrder_product = {
                        id:order_products[i].id,
                        price: newPrice,
                        quantity: newQuantity
                    }
                    await updateOrderProducts(newOrder_product)
                    updatedOrder_product = await getOrderProductsByOrder(orderId); 
                }
            }

            //if a duplicate was found, send the updated order product for confirmation
            if (productInOrder === true) {
                res.send(updatedOrder_product)
            //if there isn't a duplicate, then add the product to the order
            } else {
                await addProductToOrder({orderId, productId, price, quantity});
                updatedOrder_product = await getOrderProductsByOrder(orderId);
                res.send(updatedOrder_product);
            }
        } else {
            throw ({
                name: "UserError",
                message: "Only the user who created the order can add products to it"
            })
        }

        res.send("chicken");

    } catch ({name, message}) {
        next({name, message});
    }
})

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