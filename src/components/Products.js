import React from 'react';
import { Link } from 'react-router-dom';

import { SingleProduct, Cart } from './'

const Products = ({products, fetchProducts, productsList, testProducts}) => {
  console.log("testproducts>>>>>", testProducts)
  return <>
    <section class = 'container content-section'>
    {
      testProducts ? 
        testProducts.map(testProduct => <SingleProduct key = {testProduct.id} testProducts={testProducts} testProduct={testProduct}> 
        
        <Link to={`/products/${testProduct.id}`} className='detail_butn'>Details</Link>
        
        </SingleProduct>)
        
      : 'Rendering...'
    }
    </section>
    <section>
      <Cart testProducts={testProducts}/>
    </section>
    </>;
}

export default Products;