import React, { useState, useEffect } from 'react';
import {Route, Switch } from 'react-router-dom';

import {
  Products,
  Login,
  Register,
  Navigation
} from './';

import {
  getSomething
} from '../api';

const App = () => {
  const [message, setMessage] = useState('');
  const [products, setProducts] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword ] = useState('');
  const [token, setToken] = useState('');
  const [user, setUser] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);


  const fetchProducts = () => {
    try {
      const products = [{description: "Chia pet", price: 10.99, inStock: true, category: "plants"}];
      setProducts(products);
      
    } catch (error) {
      throw error;
    }
  }


  useEffect(() => {
    getSomething()
      .then(response => {
        setMessage(response.message);
      })
      .catch(error => {
        setMessage(error.message);
      });
  });

  useEffect(() => {
    try {
        fetchProducts();
        
    } catch (error) {
        console.error(error);
        
    }
}, [token]);

  return (
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
            <Products products = {products} fetchProducts = {fetchProducts} setProducts = {setProducts}/>
          </Route>
          
        </Switch>
      </div>
    </div>
  );
}

export default App;