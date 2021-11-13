import React from 'react';

const SingleProduct = ({product, children}) => {
    return product ?
      <div>
        <div>{product.imageURL}</div>
        <div>ID: {product.id}</div>
        <div>Name: {product.description}</div>
        <hr></hr>
        <div>Price: {product.price}</div>
        <div>In Stock: {product.inStock}</div>
        {
          children
        }
      </div>
    : 'Rendering...'
}

export default SingleProduct;