const express = require('express');
const order_productsRouter = express.Router();
const {} = require('../db/index');
const { requireUser } = require('./utils');

order_productsRouter.use((req, res, next) => {
    next();
});

order_productsRouter.patch('/:orderProductId', requireUser, async (req, res,next) => {
    const { orderProductId } = req.params;
    const { quantity } = req.body;
    try {
        const orderProduct = await getOrderProductById(orderProductId);
        const product = await getProductById (orderProduct.productId);
        const { price } = product;
        const updatedPrice = quantity * Number(price);
        const isCreator = async () => {
            const order = await getOrderById(orderProduct.orderId)
            if (order) {
                if (order.userId === req.user.id) {
                    return true;
                } else {
                    return false;
                };
            };
        };
        if (orderProduct && isCreator) {
            const newOrderProduct = await updateOrderProduct ({ id: 
                orderProductId, price: updatedPrice, quantity });
            if (newOrderProduct) {
                res.send(newOrderProduct);
            } else {
                next ({
                    name: 'FailedUpdateError',
                    message: 'This order product could not be updated'
                });
            };
        };
    } catch (error) {
        next (error);
    };
});

order_productsRouter.delete('/:orderProductId', requireUser, async (req, res, next) => {
    const { orderProductId} = req.params;
    try {
        const orderProduct = await getOrderProductById(orderProductId);
        if (orderProduct) {
            const { orderId } = orderProduct;
            const order = await getOrderById(orderId);
            if (order && order.userId === req.user.id) {
                const deletedOrderProduct = await destroyOrderProduct(orderProductId);
                if (deletedOrderProduct) {
                    res.send(deletedOrderProduct);
                };
            } else {
                next ({
                    name: 'RemoveOrderProductFailure',
                    message: 'The product was not successfully removed from the order'
                });
            };
        }
    } catch (error) {
        next (error);
    };
});



module.exports = order_productsRouter;