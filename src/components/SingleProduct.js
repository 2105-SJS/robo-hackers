import React from 'react';
import './style.css';
const SingleProduct = ({product, children,testProducts, testProduct}) => {
    return testProducts ?
    <div class = 'shop-items'>
      
      <div class = 'shop-item'>
        <span class = 'item-title'>{testProduct.description}</span>
        <div class = 'item-image'>{testProduct.imageURL}</div>
        <div class = 'item-details'>
          <span class = 'item-price'>{testProduct.price}</span>
          <button class = 'btn btn-primary shop-item-button' type = "button">Add to Cart</button>
        </div>
        {
          children
        }
      </div>

    </div>
    : 'Rendering...'
}

export default SingleProduct;