import React from 'react';
import { useParams } from 'react-router-dom';

const ProductById = ({products}) => {
  const { productId } = useParams();
  const productById = products.filter(product => product.id === Number(productId))

  return <>
    {
      productById ?
        productById.map(product =>
          <div key={product.id}>
            <div>{product.imageURL}</div>
            <div>ID: {product.id}</div>
            <div>Name: {product.description}</div>
            <hr></hr>
            <div>Price: {product.price}</div>
            <div>In Stock: {product.inStock}</div>
          </div>
        )
      : 'No item by that item number!'
    }
  </>
}

export default ProductById;