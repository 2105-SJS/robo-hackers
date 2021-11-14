import React from 'react';
import { Link, useHistory } from "react-router-dom";

const Navigation = ({username, token, setToken, setUsername}) => {
  const history= useHistory();
  
  const logOut = () => {
    setUsername('');
    setToken('');
    localStorage.removeItem('token')
    history.push('/account/:method');
  }

  return <>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <h1 className='nav_title'>Robo Hackers: The Shop</h1>
        <ul id = 'links' class="nav nav-pills">
          <li class = "nav-item">
            <Link to='/home' class="nav-link" href="#">Home</Link>
          </li>
          <li class = "nav-item">
            <Link to='/products' class="nav-link" href="#">Products</Link>
          </li>
          {
            token ?
            <li class = "nav-item">
              <Link to='/account' class="nav-link" href="#">My Account</Link>
            </li>
            : null
          }
          {
            token ? 
            null :
            <li class = "nav-item">
              <Link to="/login" class="nav-link" href="#">Login</Link>
            </li>
          }
          {
            token ?
            null :
            <li class = "nav-item">
              <Link to="/register" class="nav-link" href="#">Register</Link>
            </li> 
          }
          {
            token ? <button type='logout' onClick={logOut}>Logout</button>  : null
          }
          <li class = "nav-item">
            <Link to='/cart' class="nav-link" href="#">Cart</Link>
          </li>
        </ul>
      </div>
    </nav>
  </>
}

export default Navigation;
