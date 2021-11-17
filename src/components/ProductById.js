import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { callAPI } from '../api';

const ProductById = ({ products, token, setProducts }) => {
  const { productId } = useParams();
  const history = useHistory();

  const productById = products.filter(product => product.id === Number(productId))
  
  const handleAddToCart = async (product) => {
    try {
      const addToOrder = await callAPI({ url: `/${products.id}`, method: 'POST', token, body: product})
      if(addToOrder) {
        history.push('/cart')
      }

    } catch (error) {
      throw error;
    }
  }

  return <>
    {
      productById ?
        productById.map(product =>
          <div key={product.id}>
            <img src={product.imageURL} alt='' class='img-thumbnail' class='w-25'/>
            <div>ID: {product.id}</div>
            <div>Name: {product.name}</div>
            <div>Description: {product.description}</div>
            <div>Price: {product.price}</div>
            <div>In Stock: {product.inStock}</div>
            <button onClick={() => {handleAddToCart(product)}} class="btn btn-info">Add to cart</button>
            <hr></hr>
          </div>
        )
      : 'No item by that item number!'
    }
  </>
}

export default ProductById;