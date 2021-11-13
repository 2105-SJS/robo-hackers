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
  ProductById,
  Orders
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

  useEffect(() => {
    const getProducts = async () => {
      try {
        const respObj = await callAPI({url: 'products'});
        if(respObj) {
          setProducts(respObj.products);
          return respObj
        }
      } catch (error) {
        throw error;
      }
    }
    getProducts()
  }, [])

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
            <Products products = {products} setProducts = {setProducts} orders = {orders} token={token}/>
          </Route>

          <Route exact path = "/products/:testProductId">
            <ProductById products = {products}/>
          </Route>
          
          <Route exact path = "/account">
            <MyAccount user={user}/>
          </Route>

          <Route exact path = "/checkout">
            <Checkout />
          </Route>


          <Route exact path = "/cart">
            <Orders />
          </Route>

        </Switch>
      </div>
    </div>
  </>;
}

export default App;