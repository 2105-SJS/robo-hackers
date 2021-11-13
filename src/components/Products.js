// import React from 'react';
// import { Link } from 'react-router-dom'; 

// import { SingleProduct } from './'

// const Products = ({products, fetchProducts, productsList}) => {

//   return <>
//     {
//       products ? 
//         products.map(product => <SingleProduct key = {product.id} product = {product}> 
//         <Link to={`/products/${product.id}`}>Details</Link>
//         </SingleProduct>)
//       : 'Rendering...'
//     }
//     </>;
// }

// export default Products;

import React from 'react';
import { Link } from 'react-router-dom';
import {useHistory} from 'react-router'

import {
  callAPI
} from '../api';

const Products = ({products, setProducts, token}) => {
  const history = useHistory();

const handleAddToCart = async (product) => {
  try {
    const addToOrder = await callAPI({ url: `/${products.id}`, method: 'POST', token, body: product})
    if(addToOrder) {
      history.push('/cart')
    }
    console.log('clicked', addToOrder)
  } catch (error) {
    console.error(error)
  }
}
  return <>
  {
    products ?
      products.map (product => <>
      <div key = {product.id}>
        <div>{product.description}</div>
        <div>
          <img src = {product.imgURL} />
          <h4>{product.price}</h4>
            <button onClick={() => {handleAddToCart(product)}}>Add to cart</button>
        </div>
      </div>
      </>) : null
  }
  </>
}

export default Products;