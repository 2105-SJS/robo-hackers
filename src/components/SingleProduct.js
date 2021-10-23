import React from 'react';

const SingleProduct = ({product}) => {
    return product ?
    <div>
        <div>{product.imageURL}</div>
        <div>Name: {product.description}</div>
        <hr></hr>
        <div>Price: {product.price}</div>
        <div>In Stock: {product.inStock}</div>
    </div>
    : 'Rendering...'
}

export default SingleProduct;