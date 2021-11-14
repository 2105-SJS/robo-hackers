// import React, {useEffect, useState} from "react";
// import {callAPI} from '../api';
// import Checkout from './Checkout';

// const Orders = ({token, setOrders, orders, products}) => {
//     let total = 0
    
//     useEffect(() => {
//         const getOrders = async () => {
//             try {
//                 const respObj = await callAPI({ url: 'orders/cart', token});
//                 if (respObj) {
//                     setOrders(respObj)
//                     return respObj;
//                 }
//             } catch (error) {
//                 throw error;
//             }
//         }
//         getOrders()
//     }, []);
//     for(let i = 0; i < orders.length; i++) {
//         total += Number(orders[i].products[0].price)
//     }
//     return <>
//     <h2>Cart</h2>
//     <div>
//         {
//             orders.map(order => <>
//             <div key = {order.id}>
//                 {
//                     order.products.map(orderProduct => <>
//                     <div><img src = {orderProduct.imgUrl} alt=''/>{orderProduct.title} {orderProduct.price}</div>
//                     </>
//                     )
//                     }
//                     </div>
//                 </>)
//         }
//     </div>
//     <h2>${total}</h2>
//     <div>
//         <Checkout />
//     </div>
//     </>

// }

// export default Orders;


import React, {useEffect, useState} from "react";
import {callAPI} from '../api';
import Checkout from './Checkout';



const Orders = ({token, setOrders, orders, products}) => {

    // const [testProducts, setTestProducts] = useState([]);
    // const [testOrders, setTestOrders] = useState([]);
    // const [testOrderProducts, setTestOrderProducts] = useState([]);
    // const [testUsers, setTestUsers] = useState([]);

    const demoUsers = [
        {firstName: 'chicken', lastName: 'sandwich', email: 'chickenSandwich@gmail.com', imageURL:'chicken', username:'chicken555', password:'sandwich555', isAdmin: false},
        {firstName: 'dinosaur', lastName: 'sandwich', email: 'dinosaurSandwich@gmail.com', imageURL:'dinosaur', username:'dinosaur555', password:'sandwich555', isAdmin: false},
        {firstName: 'bruce', lastName: 'wayne', email: 'darkKnight@gmail.com', imageURL:'batman', username:'batman555', password:'sandwich555', isAdmin: true}
        
      ]

    const demoProducts = [
        {name:"Potato", description: "yukon potato at its finest", price: 5.99, imageURL:"potato", inStock: true, category:'food'},
        {name:"Cheesecake", description: "German Raspberry Cheesecake", price: 6, imageURL:'cheesecake', inStock: false, category:'food'},
        {name:"laser gun", description: "from the future!", price:75.00, imageURL:'laser', inStock: true, category:'weaponry'},
        {name:"Gundam", description: "big cool robot", price: 120, imageURL:"gundam", inStock: true, category:'toy'},
        {name:"Pokemon Emerald", description: "old school pokemon at it's finest", price: 50, imageURL:"emerald cartridge", inStock: true, category:'video game'},
        {name:"Vanille Ice Cream", description: "tasty vanilla ice cream", price: 5.99, imageURL:"https://media.istockphoto.com/photos/front-view-of-real-edible-ice-cream-cone-with-3-different-scoops-of-picture-id1148364081?k=20&m=1148364081&s=612x612&w=0&h=Ukaod6oXxX7Jn1KPk8r4UkkK7lNz-SBvS2YkRL-C6Q0=", inStock: true, category:'food'},
        {name:"Banana", description: "a single ripe banana", price: 124.45, imageURL: "https://media.istockphoto.com/photos/big-banana-picture-id182817811?b=1&k=20&m=182817811&s=170667a&w=0&h=1VbC6BgMmIbftOxBBIgkgrwG4i0SLWa3MTX7RRFCwPk=", inStock: false, category:'food'},
        {name:"Shoes Running", description: "lightly worn running shoes", price:75.00, imageURL:'https://media.istockphoto.com/photos/sport-shoes-on-isolated-white-background-picture-id956501428?k=20&m=956501428&s=612x612&w=0&h=UC4qdZa2iA0PJvv0RIBlJDyF80wxFyLPq4YWvZa30Sc=', inStock: true, category:'shoes'}
    ]

    const demoOrders = [
        {status:'created', userId: 2, datePlaced:'10/24/2021'},
        {status: 'created', userId: 1, datePlaced:'5/2/1996'},
        {status: 'completed', userId: 1, datePlaced:'2/2/2022'},
        {status:'created', userId: 3,datePlaced:'12/24/1995'}
      ]
    
      const demoOrderProducts = [
        {productId: 1, orderId: 1, price: 120.88, quantity: 50},
        {productId: 3, orderId: 2, price: 120398.23, quantity: 7},
        {productId: 4, orderId: 4, price: 200, quantity: 2},
        {productId: 5, orderId: 4, price: 50, quantity: 1},
        {productId: 2, orderId: 4, price: 35, quantity: 3}
  
      ]
    //   setTestUsers(demoUsers);
    //   setTestProducts(demoProducts);
    //   setTestOrders(demoOrders);
    //   setTestOrderProducts(demoOrderProducts);

    let total = 0
    
    for(let i = 0; i < demoOrders.length; i++) {
        total += Number(demoOrders[i].demoProducts[0].price)
    }
    return <>
    <h2>Cart</h2>
    <div>
        {
            demoOrders.map(demoOrder => <>
            <div key = {demoOrder.id}>
                {
                    demoOrder.demoProducts.map(demoOrderProduct => <>
                    <div><img src = {demoOrderProduct.imgUrl} alt=''/>{demoOrderProduct.title} {demoOrderProduct.price}</div>
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