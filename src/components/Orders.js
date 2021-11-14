import React, {useEffect, useState} from "react";
import {callAPI} from '../api';
import Checkout from './Checkout';

const Orders = ({token, setOrders, orders, products}) => {
    let total = 0
    
    useEffect(() => {
        const getOrders = async () => {
            try {
                const respObj = await callAPI({ url: 'orders/cart', token});
                if (respObj) {
                    setOrders(respObj)
                    return respObj;
                }
            } catch (error) {
                throw error;
            }
        }
        getOrders()
    }, []);
    for(let i = 0; i < orders.length; i++) {
        total += Number(orders[i].products[0].price)
    }
    return <>
    <h2>Cart</h2>
    <div>
        {
            orders.map(order => <>
            <div key = {order.id}>
                {
                    order.products.map(orderProduct => <>
                    <div><img src = {orderProduct.imgUrl} alt=''/>{orderProduct.title} {orderProduct.price}</div>
                    </>
                    )
                    }
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