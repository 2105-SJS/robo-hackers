import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'

const Register = ({setLoggedIn, setToken, setUsername, setPassword, username, password, setUser}) => {
    const[secondPassword, setSecondPassword] = useState('');
    const history = useHistory();

    const handleSubmit = async (ev) => {
        try {
            ev.preventDefault();
            const registerObj = await callAPI({
              method: 'POST',
              url: 'users/register',
              body: {
                username: username,
                password: password, 
                firstName: firstName, 
                lastName: lastName, 
                email: email, 
                isAdmin: 'false'
              }
            })
            if (token) {
                localStorage.setItem('token', token);
                localStorage.setItem('username', username);
                setToken(token);
                setLoggedIn(true);
                setUsername('');
                setPassword('');
                setUser(user);
                history.push('./home')
            }
            
        } catch (error) {
            console.error(error)
        }
    }
    
    return <>
        <h1>
        | Register User |
        </h1>
        <form onSubmit = {handleSubmit} >
            <div >
              
                <input type="text" placeholder="username" value={username} onChange={(event) => setUsername(event.target.value)}></input>
                <hr></hr>
                <input type="password" placeholder="password" value={password} onChange={(event) => setPassword(event.target.value)}></input>
                <hr></hr>
                <input type="password" placeholder="password" value={secondPassword} onChange={(event) => setSecondPassword(event.target.value)}></input>
                <hr></hr>
                <button type="submit" disabled={!password || !username || password.length <8 || password !== secondPassword}>Submit</button>
                <hr></hr>
                {
                    password !== secondPassword && <span>Passwords do not match!</span>
                }
                {
                    password.length < 8 && <div>Password must be at least 8 characters!</div>
                }
            </div>
        </form>
    
    </>
}

export default Register;