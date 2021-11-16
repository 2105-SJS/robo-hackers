import React, {useEffect, useState} from "react";
import {callAPI} from '../api';
import Checkout from './Checkout';

const Orders = ({token, setOrders, orders, products, user}) => {
    let total = 0
    
    useEffect(() => {
        const getOrders = async () => {
            try {
                if (user && user.id) {
                    const respObj = await callAPI({ url: 'orders/cart', token});
                    console.log("RESPONSE TO GETTING CART", respObj);
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

    console.log("ORDERS AFTER BEING SET IN ORDERS>JS", orders)
    return <>
    <h2>Cart</h2>
    <div>
        {
            orders && orders.map(order => 
        <>
            <div key = {order.id}>
                  <img src={order.imageURL} alt=''/>{order.name} {order.price}
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