import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import SingleProduct from './SingleProduct'

import {
  callAPI
} from '../api';

const Products = ({products, setProducts, token}) => {
  const history = useHistory();

  const handleAddToCart = async (product) => {
    try {
      
      
      const addToOrder = await callAPI({ url: `orders/${product.id}/products`, method: 'POST', token, body: product})
      
      if(addToOrder) {
        history.push('/cart')
      }

    } catch (error) {
      throw error;
    }
  }
  return <>
  {
    products ?
      products.map (product => (
        <SingleProduct key={product.id} product={product} >
          <Link to={`/products/${product.id}`} className = 'details-link'>Details</Link>
          <button type="button" class="btn btn-info" onClick={() => {handleAddToCart(product)}}>Add to cart</button>
        </SingleProduct>
      )) : null
  }
  </>
}

export default Products;
