import React, { useState, useEffect } from 'react';
import {Route, Switch } from 'react-router-dom';

import './bootstrap.min.css';
import './style.css';

import {
  Products,
  Login,
  Register,
  Navigation,
  MyAccount,
  Checkout,
  ProductById,
  Orders,
  Homepage
} from './';

import {
  callAPI
} from '../api';

const App = () => {
  const [products, setProducts] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword ] = useState('');
  const [token, setToken] = useState('');
  const [user, setUser] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [orders, setOrders] = useState([]); 
  
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
        throw error;
          
    }
  }, [token]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) setToken(token);
  }, []);

  return <>
    <div className="App">

      <Navigation token={token} setToken= {setToken} loggedIn = {loggedIn} setLoggedIn = {setLoggedIn} setUsername = {setUsername} setPassword = {setPassword}/>

      <div>
        <Switch>

          <Route exact path = "/home">
            <Homepage token={token} user = {user} />
          </Route>

          <Route exact path = "/login">
            <Login setToken= {setToken} token={token} setUsername = {setUsername} setPassword = {setPassword} username = {username} password = {password} setLoggedIn = {setLoggedIn} setUser = {setUser} user = {user} />
          </Route>

          <Route exact path = "/register">
              <Register setToken= {setToken} token={token} setUsername = {setUsername} setPassword = {setPassword} username = {username} password = {password} setLoggedIn = {setLoggedIn} setUser = {setUser} user = {user}/>
          </Route>

          <Route exact path = "/products">
            <Products products={products} fetchProducts={fetchProducts} setProducts={setProducts} orders={orders} token={token} />
          </Route>

          <Route exact path = "/products/:productId">
              <ProductById products={products} token={token} setProducts={setProducts} />
          </Route>
          
          <Route exact path = "/account">
            <MyAccount user={user}/>
          </Route>

          <Route exact path = "/checkout">
            <Checkout />
          </Route>
          
          <Route exact path = "/cart">
            <Orders user = {user} token = {token} setOrders = {setOrders} orders = {orders} products = {products}/>
          </Route>

          {/* <Route exact path = "/cart">
            <Admin token = {token} setOrders = {setOrders} orders = {orders} products = {products}/>
          </Route> */}

        </Switch>
      </div>
    </div>
  </>;
}

export default App;