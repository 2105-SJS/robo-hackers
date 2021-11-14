import React from 'react';

const SingleProduct = ({product, children}) => {
    return product ?
      <div key={product.id}>
        <img src={product.imageURL} alt=''/>
        <div>ID: {product.id}</div>
        <div>Name: {product.description}</div>
        <div>Price: {product.price}</div>
        <div>In Stock: {product.inStock}</div>
        {
          children
        }
        <hr></hr>
      </div>
    : 'Rendering...'
}

export default SingleProduct;