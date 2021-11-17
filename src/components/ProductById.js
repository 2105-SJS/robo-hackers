import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { callAPI } from '../api';

const ProductById = ({ products, token, setProducts, fetchProducts }) => {
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

  const handleDelete = async (product) => {
    try {
      const respObj = await callAPI({
        url: `products/${ product.productId}`,
        method: 'DELETE',
        token

      });
      await fetchProducts();
      
    } catch (error) {
      
    }
  }

  return <>
    {
      productById ?
        productById.map(product =>
          <div key={product.id}>
            <img src={product.imageURL} alt=''/>
            <div>ID: {product.id}</div>
            <div>Name: {product.name}</div>
            <div>Description: {product.description}</div>
            <div>Price: {product.price}</div>
            <div>In Stock: {product.inStock}</div>
            <button onClick={() => {handleAddToCart(product)}}>Add to cart</button>
            <hr></hr>
            isAdmin ? <button onClick ={() => handleDelete}>DELETE</button> : null
          </div>
        )
      : 'No item by that item number!'
    }
  </>
}

export default ProductById;