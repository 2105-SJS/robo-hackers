import React, { useState, useEffect } from 'react';
import {Route, Switch } from 'react-router-dom';

import './bootstrap.min.css';

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
  const fetchProducts = async () => {
    try {
      const productsObj = await callAPI({
        method: 'GET',
        url: 'products',
      });
      if(productsObj) setProducts(productsObj);

    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    try {
      fetchProducts();
          
    } catch (error) {
        console.error(error);
          
    }
  }, [token]);

  return <>
    <div className="App">
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
            <Products products = {products} fetchProducts = {fetchProducts} setProducts = {setProducts} />
          </Route>

          <Route exact path = "/products/:productId">
            <ProductById products = {products} />
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