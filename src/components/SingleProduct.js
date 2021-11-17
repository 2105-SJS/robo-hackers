import React from 'react';

const SingleProduct = ({product, children}) => {
    return product ?
    <div class = 'store-items' key = {product.id} className='single-product-display'>
      <div className='single-product-display-content'>
        <div>{product.name}</div>
        <img class = 'item-image' src = {product.imageURL} class='img-thumbnail' class='w-25' alt=''/>
        <div>{product.description}</div>
        <div>${product.price}</div>
        <span className='product-details-addtocart'>
            {
              children
            }
            <hr></hr>
        </span>
      </div>
    </div>
    : 'Rendering...'
}

export default SingleProduct;