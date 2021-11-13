import React, { useState, useEffect } from 'react';
import {Route, Switch } from 'react-router-dom';

import './style.css';

import {
  Products,
  Login,
  Register,
  Navigation,
  MyAccount,
  Checkout,
  ProductById
} from './';

import {
  callAPI
} from '../api';

const App = () => {
  const [message, setMessage] = useState('');
  const [products, setProducts] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword ] = useState('');
  const [token, setToken] = useState('');
  const [user, setUser] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const testProducts = [
  {description: "tasty vanilla ice cream", price: 5.99, imageURL:<img class = 'image' src = "http://pngimg.com/uploads/ice_cream/ice_cream_PNG5103.png" />, inStock: true, category:'food'},
  {description: "a single ripe banana", price: 124.45, imageURL: <img class = 'image' src = "https://pngimg.com/uploads/banana/banana_PNG104253.png"/>, inStock: false, category:'food'},
  {description: "lightly worn running shoes", price:75.00, imageURL: <img class = 'image' src = "https://www.freepnglogos.com/uploads/shoes-png/shoes-wasatch-running-3.png" />, inStock: true, category:'shoes'}]
  
  // const fetchProducts = async () => {
  //   console.log('products>>>>>', products)
  //   try {
  //     const productsObj = await callAPI({
  //       method: 'GET',
  //       url: 'products',
  //     });
  //     if(productsObj) setProducts(productsObj);

  //   } catch (error) {
  //     throw error;
  //   }
  // }
    console.log('products>>>>>>>', products)
  const getProducts = async () => {
    const respObj = await callAPI({
      url: 'products'
    });
    console.log('repsobj>>>>', respObj)
    const items = respObj.data.products;
    if(items) setProducts(items)
    console.log('items>>>>>>', items)
  };
  useEffect(() => {
    try {
      getProducts();
          
    } catch (error) {
        console.error(error);
          
    }
  }, [token]);

  // useEffect(() => {
  //   try {
  //     fetchProducts();
          
  //   } catch (error) {
  //       console.error(error);
          
  //   }
  // }, [token]);

  return <>
    <div className="App">
      <h1>Hello, World!</h1>
      <h2>{ message }</h2>

      <Navigation token={token} setToken= {setToken} loggedIn = {loggedIn} setLoggedIn = {setLoggedIn} setUsername = {setUsername} setPassword = {setPassword}/>

      <div>
        <Switch>

          <Route exact path = "/login">
            <Login setToken= {setToken} token={token} setUsername = {setUsername} setPassword = {setPassword} username = {username} password = {password} setLoggedIn = {setLoggedIn} setUser = {setUser} user = {user} />
          </Route>

          <Route exact path = "/register">
              <Register setToken= {setToken} token={token} setUsername = {setUsername} setPassword = {setPassword} username = {username} password = {password} setLoggedIn = {setLoggedIn} setUser = {setUser} user = {user}/>
          </Route>

          <Route exact path = "/products">
            <Products products = {products} setProducts = {setProducts} testProducts = {testProducts}/>
          </Route>

          <Route exact path = "/products/:testProductId">
            <ProductById products = {products} testProducts = {testProducts} />
          </Route>
          
          <Route exact path = "/account">
            <MyAccount user={user}/>
          </Route>

          <Route exact path = "/checkout">
            <Checkout />
          </Route>

        </Switch>
      </div>
    </div>
  </>;
}

export default App;