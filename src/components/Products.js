import React from 'react';

import { SingleProduct} from './'

const Products = async ({products, fetchProducts}) => {

    return <>
    {
        products ? products.map(product => <SingleProduct key = {product.id} product = {product}>
            </SingleProduct>)
            : 'Rendering...'
    }
    </>;
}

export default Products;