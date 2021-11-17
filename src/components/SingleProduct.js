import React from 'react';

const SingleProduct = ({product, children}) => {
    return product ?
    <div class = 'store-items' key = {product.id}>
    <div class = 'store-item'>
      <span class = 'item-title'>{product.name}</span>
      <img class = 'item-image' src = {product.imageURL} class='img-thumbnail' class='w-25' alt=''/>
      <div class = 'item-details'>
      <span>{product.description}</span>
      <span class = 'item-price'>${product.price}</span>
      </div>
          {
            children
          }
          <hr></hr>
        </div>
      </div>
    : 'Rendering...'
}

export default SingleProduct;