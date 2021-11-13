import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {SingleProduct} from './';

// const ProductById = ({products}) => {
//   const { productId } = useParams();
//   const productById = products.filter(product => product.id === Number(productId))

//   return <>
//     {
//       productById ?
//         productById.map(product =>
//           <div key={product.id}>
//             <div>{product.imageURL}</div>
//             <div>ID: {product.id}</div>
//             <div>Name: {product.description}</div>
//             <hr></hr>
//             <div>Price: {product.price}</div>
//             <div>In Stock: {product.inStock}</div>
//           </div>
//         )
//       : 'No item by that item number!'
//     }
//   </>
// }

const ProductById = ({testProducts, testProduct}) => {
  const { testProductId } = useParams();
  const history = useHistory();

  const testProductById = testProducts.filter(testProduct => testProduct.id === Number(testProductId))
  
  const handleBack = () => {
    history.pushState('/products');
  }

  return <>
    <div>
      <SingleProduct testProduct={testProduct} />
      <button className='backbutton' onClick = {() => handleBack()}>Back</button>
    </div>
  </>
}

export default ProductById;