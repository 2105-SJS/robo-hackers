import React from 'react';
import { Link } from 'react-router-dom'; 

import { SingleProduct } from './'

const Products = ({products, fetchProducts, productsList}) => {

  return <>
    {
      products ? 
        products.map(product => <SingleProduct key = {product.id} product = {product}> 
        <Link to={`/products/${product.id}`}>Details</Link>
        </SingleProduct>)
      : 'Rendering...'
    }
    </>;
}

export default Products;