import React, {useEffect, useState} from "react";
import {callAPI} from '../api';
import Checkout from './Checkout';
import SingleProduct from './SingleProduct.js';

const Orders = ({token, setOrders, orders, products, user}) => {
    let total = 0
    
    useEffect(() => {
        const getOrders = async () => {
            try {
                if (user && user.id) {
                    const respObj = await callAPI({ url: 'orders/cart', token});
                    if (respObj) {
                        setOrders(respObj.products)
                        return respObj;
                    }
                }
            } catch (error) {
                throw error;
            }
        }
        getOrders()
    }, []);

    orders.forEach(product => {
        total += Number(product.price);
    })

    

    return <>
    <h2>Cart</h2>
    <div>
        {
            orders && orders.map(order => 
        <>
            <div key = {order.id}>
            <SingleProduct key={order.id} product={order} />          
            </div>
         </>)
        }
    </div>
    <h2>${total}</h2>
    <div>
        <Checkout />
    </div>
    </>

}

export default Orders;