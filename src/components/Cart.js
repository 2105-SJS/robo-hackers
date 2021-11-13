
import React, {useEffect, useState} from 'react';



const Cart = () => {
    const cartProducts = [
    {description: "tasty vanilla ice cream", price: 5.99, imageURL:<img class = 'image' src = "http://pngimg.com/uploads/ice_cream/ice_cream_PNG5103.png" />, inStock: true, category:'food'},
    {description: "a single ripe banana", price: 124.45, imageURL: <img class = 'image' src = "https://pngimg.com/uploads/banana/banana_PNG104253.png"/>, inStock: false, category:'food'},
    {description: "lightly worn running shoes", price:75.00, imageURL: <img class = 'image' src = "https://www.freepnglogos.com/uploads/shoes-png/shoes-wasatch-running-3.png" />, inStock: true, category:'shoes'}
    ]
    const removeButton = document.getElementsByClassName('btn-danger');
    for (let i = 0; i < removeButton.length; i++) {
        const button = removeButton[i];
        button.addEventListener('click', function(event) {
            const buttonClicked = event.target
            buttonClicked.parentElement.parentElement.remove();
            console.log('clicked');
            updateTotal();
        })
    }

    const updateTotal = () => {
        const cartItemContatiner = document.getElementsByClassName('cart-items')[0];
        const cartRows = cartItemContatiner.getElementsByClassName('cart-row');
        const total = 0
        for (let i = 0; i < cartRows.length; i++) {
            const cartRow = cartRows[i];
            const priceElement = cartRow.getElementsByClassName('cart-price')[0];
            const quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
            const price = parseFloat(priceElement.innerText.replace('$', ''));
            const quantity = quantityElement.value;
            total = total + (price * quantity);
        }
        document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total;
    }

    return <>
    <section class = 'container content-section'>
        <h2>CART</h2>
        <div class = 'cart-row'>
            <span class = 'cart-item cart-header cart-column'>ITEM</span>
            <span class = 'cart-price cart-header cart-column'>PRICE</span>
            <span class = 'cart-quantity cart-header cart-column'>QUANTITY</span>
        </div>
        <div class = 'cart-items'>
            <div class = 'cart-row'>
                <div class = 'cart-item cart-column'>
                    {
                        cartProducts.imageURL
                    }
                    <span class = 'cart-item-title'>t-shirt</span>
                </div>
                <span class = 'cart-price cart-column'> 99.99</span>
                <div class = 'cart-quantity cart-column'>
                    <input class = 'cart-quantity-input' type = "number" value = '1'/>
                    <button class = 'btn btn-danger' type="button">REMOVE</button>
                </div>
            </div>
        </div>
        <div class = 'cart-total'>
            <strong class = 'cart-total-title'>Total</strong>
            <span class = 'cart-total-price'>$99.99</span>
        </div>   
        <button class = 'btn btn-primary btn-purchase' type = 'button'>Checkout</button>
    </section>
    </>

}

export default Cart;