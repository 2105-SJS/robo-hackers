import React from 'react';
import './style.css';
import {callAPI} from '../api';

const SingleProduct = ({token, product, children,testProducts, testProduct}) => {
  const handleAddToCart = async (testProduct) => {
    try {
      const addtoOrder = await callAPI({ url: 'orders', method: 'POST', token, body: product})
      console.log('added>>>>', addtoOrder)
    } catch (error) {
      console.error(error)
    }
  }
    return testProducts ?
    <div class = 'shop-items'>
      
      <div class = 'shop-item'>
        <span class = 'item-title'>{testProduct.description}</span>
        <div class = 'item-image'>{testProduct.imageURL}</div>
        <div class = 'item-details'>
          <span class = 'item-price'>{testProduct.price}</span>
          <button onClick = {() => {
            handleAddToCart(product)}}>Add to cart</button>
        </div>
        {
          children
        }
      </div>

    </div>
    : 'Rendering...'
}

export default SingleProduct;