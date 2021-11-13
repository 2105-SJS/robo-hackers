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
                    <a class = "nav-link" href = "#" ><Link to = '/home'>Home</Link></a>
                </li>
                <li class = "nav-item">
                    <a class = "nav-link" href = "#" ><Link to = '/products'>Products</Link></a>
                </li>
                {
                  token ?
                  <li class = "nav-item">
                      <a class = "nav-link" href = "#" ><Link to = '/account'>My Account</Link></a>
                  </li>
                  : null
                }
                {
                    token ? 
                    null :
                    <li class = "nav-item">
                        <a class = "nav-link" href = "#"><Link to="/login">Login</Link></a>
                    </li>
                }
                {
                    token ?
                    null :
                    <li class = "nav-item">
                        <a class = "nav-link" href = "#"><Link to ="/register">Register</Link></a>
                    </li> 
                }
                {
                    token ? <button type='logout' onClick={logOut}>Logout</button>  : null
                }
                <li class = "nav-item">
                    <a class = "nav-link" href = "#" >
                        <Link to = '/cart'>Cart</Link>
                    </a>
                </li>


            </ul>
        </div>

    </nav>
    
    
    </>


}
export default Navigation;
