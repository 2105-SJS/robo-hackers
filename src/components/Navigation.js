import React from 'react';
import { Link, useHistory } from "react-router-dom";

const Navigation = ({username, token, setToken, setUsername}) => {
  const history= useHistory();
  
  const logOut = () => {
    setUsername('');
    setToken('');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    history.push('/home');
  }

  return <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <h1 className='nav_title'>Robo Hackers: The Shop</h1>
        <ul id = 'links' className="nav nav-pills">
          <li className = "nav-item">
            <Link to='/home' className="nav-link" href="#">Home</Link>
          </li>
          <li className = "nav-item">
            <Link to='/products' className="nav-link" href="#">Products</Link>
          </li>
          {
            token ?
            <li className = "nav-item">
              <Link to='/account' className="nav-link" href="#">My Account</Link>
            </li>
            : null
          }
          {
            token ? 
            null :
            <li className = "nav-item">
              <Link to="/login" className="nav-link" href="#">Login</Link>
            </li>
          }
          {
            token ?
            null :
            <li className = "nav-item">
              <Link to="/register" className="nav-link" href="#">Register</Link>
            </li> 
          }
          {
            token ? <button type='logout' onClick={logOut}>Logout</button>  : null
          }
          <li className = "nav-item">
            {
              token ? <Link to='/cart' className="nav-link" href="#">Cart</Link> : null
            }
          </li>
        </ul>
      </div>
    </nav>
  </>
}

export default Navigation;
