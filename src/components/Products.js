// import React from 'react';
// import { Link, useHistory } from 'react-router-dom';
// import SingleProduct from './SingleProduct'

// import {
//   callAPI
// } from '../api';

// const Products = ({products, setProducts, token}) => {
//   const history = useHistory();

//   const handleAddToCart = async (product) => {
//     try {
//       const addToOrder = await callAPI({ url: `/${products.id}`, method: 'POST', token, body: product})
//       if(addToOrder) {
//         history.push('/cart')
//       }

//     } catch (error) {
//       throw error;
//     }
//   }
//   return <>
//   {
//     products ?
//       products.map (product => <>
//         <SingleProduct key={product.id} product={product} >
//           <Link to={`/products/${product.id}`}>Details</Link>
//           <button onClick={() => {handleAddToCart(product)}}>Add to cart</button>
//         </SingleProduct>
//       </>) : null
//   }
//   </>
// }

// export default Products;



import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import SingleProduct from './SingleProduct'

import {
  callAPI
} from '../api';

const Products = ({products, setProducts, token}) => {
  
  const [testProducts, setTestProducts] = useState([]);
    const [testOrders, setTestOrders] = useState([]);
    const [testOrderProducts, setTestOrderProducts] = useState([]);
    const [testUsers, setTestUsers] = useState([]);

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
    ]

    const demoOrders = [
        {status:'created', userId: 2, datePlaced:'10/24/2021'},
        {status: 'created', userId: 1, datePlaced:'5/2/1996'}
      ]
    
      const demoOrderProducts = [
        {productId: 1, orderId: 1, price: 120.88, quantity: 50},
        {productId: 3, orderId: 2, price: 120398.23, quantity: 7},
      ]
      // setTestUsers(demoUsers);
      // setTestProducts(demoProducts);
      // setTestOrders(demoOrders);
      // setTestOrderProducts(demoOrderProducts);


  const history = useHistory();

  const handleAddToCart = async (product) => {
    try {
      const addCart = await callAPI({
        url: 'orders',
        method: 'POST',
        token,
        body: product
      });
      
      if(addCart){
      history.push('/cart')
    }
    } catch (error){
      throw error;
    }
    
  }
  return <>
  {
    demoProducts ?
      demoProducts.map (demoProduct => <>
      <div class = 'store-items' key = {demoProduct.id}>
        <div class = 'store-item'>
          <span class = 'item-title'>{demoProduct.name}</span>
          <img src = {demoProduct.imgURL} />
          <div class = 'item-details'>
          <span>{demoProduct.description}</span>
          <span class = 'item-price'>${demoProduct.price}</span>
          </div>

        <button onClick={handleAddToCart}>Add to cart</button>
        </div>
      </div>
      </>) : null
  }
  </>
}

export default Products;
