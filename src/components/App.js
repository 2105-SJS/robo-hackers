import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import {
  Products,
  SingleProduct
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
  const [userId, setUserId] = useState('');
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
      <Navigation username={username} token={token} setUsername = {setUsername} setToken= {setToken}/>
      <div>
        <Switch>
          <Route exact path = "/products">
            <Products products = {products} fetchProducts = {fetchProducts} setProducts = {setProducts}/>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;