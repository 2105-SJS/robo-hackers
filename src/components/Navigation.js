import React from 'react';
import { Link, useHistory } from "react-router-dom"

const Navigation = ({username, token, setToken, setUsername}) => {
    const history= useHistory();
    const logOut = () => {
        setUsername('');
        setToken('');
        localStorage.remove('token')
        history.push('/account/:method');
    }
    return <>
    <nav>
        <div>
            <h1>Robo Hackers: The Shop</h1>
            <ul>
                <Link to = '/home'>Home</Link>
                <Link to = '/products'>Products</Link>
                <Link to = '/account'>My Account</Link>
                {
                    token ? null : <Link to="/account/login">Login</Link> 
                }
                {
                    token ? null : <Link to ="/account/register">Register</Link> 
                }
                {
                    token ? <button type='logout' onClick={logOut}>Logout</button>  : null
                }


            </ul>
        </div>

    </nav>
    
    
    </>


}
export default Navigation;