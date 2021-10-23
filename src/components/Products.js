import React from 'react';

import { SingleProduct } from './'

const Products = ({products, fetchProducts, productsList}) => {
    console.log('Products <><><><><', productsList)
    return <>
    {/* <h3>{productsList[0].description}</h3> */}
    {
        products ? products.map(product => <SingleProduct key = {product.id} product = {product}>
            </SingleProduct>)
            : 'Rendering...'
    }
    </>;
}

export default Products;