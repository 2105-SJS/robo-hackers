// import React from 'react';
// import { Link } from 'react-router-dom';

// import { SingleProduct, Cart } from './'

// const Products = ({products, fetchProducts, productsList, testProducts, token}) => {
//   console.log("testproducts>>>>>", testProducts)
//   return <>
//     <section class = 'container content-section'>
//     {
//       testProducts ? 
//         testProducts.map(testProduct => <SingleProduct key = {testProduct.id} token={token} testProducts={testProducts} testProduct={testProduct}> 
        
//         <Link to={`/products/${testProduct.id}`} className='detail_butn'>Details</Link>
//         <button type = 'submit'>Add to cart</button>
//         </SingleProduct>)
        
//       : 'Rendering...'
//     }
//     </section>
//     <section>
//       <Cart testProducts={testProducts}/>
//     </section>
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
    const addToOrder = await callAPI({ url: 'orders', method: 'POST', token, body: product})
    console.log('clicked', addToOrder)
  } catch (error) {
    console.error(error)
  }
  if(addToOrder) {
    history.push('/cart')
  }
}
  return <>
  {
    products ?
      productss.map (product => <>
      <div key = {product.id}>
        <div>{product.description}</div>
        <div>
          <img src = {product.imgURL} />
          <h4>${product.price}</h4>
            <button onClick={() => {handleAddToCart(product)}}>Add to cart</button>
        </div>
      </div>
      </>) : null
  }
  </>
}

export default Products;