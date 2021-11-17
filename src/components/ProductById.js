import React from 'react';
import { useParams, useHistory } from 'react-router-dom';

const ProductById = ({ products }) => {
  const { productId } = useParams();
  const history = useHistory();

  const productById = products.filter(product => product.id === Number(productId))
  
  const handleButton = () => {
    try {
      history.push('/products')

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
            <button type="button" onClick={() => {handleButton()}} class="btn btn-info">Back</button>
            <hr></hr>
          </div>
        )
      : 'No item by that item number!'
    }
  </>
}

export default ProductById;