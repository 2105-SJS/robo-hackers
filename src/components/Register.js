import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { callAPI } from '../api';

const Register = ({setLoggedIn, setToken, setUsername, setPassword, username, password, setUser}) => {
  const[secondPassword, setSecondPassword] = useState('');
  const history = useHistory();
  const [ firstName, setFirstName ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ email, setEmail ] = useState('');
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
      if (registerObj.token) {
        localStorage.setItem('token', registerObj.token);
        localStorage.setItem('username', username);
        setToken(registerObj.token);
        setLoggedIn(true);
        setFirstName('');
        setLastName('');
        setEmail('');
        setUsername('');
        setPassword('');
        setSecondPassword('');
        setUser(registerObj.user);
        history.push('./home');
      }
            
    } catch (error) {
      console.error(error)
    }
  }
    
<<<<<<< HEAD
  return <>
    <h1>| Register User |</h1>
    <form onSubmit = {handleSubmit} >
      <div>
        <input type="text" placeholder="First Name" value={firstName} onChange={(event) => setFirstName(event.target.value)}></input>
        <hr></hr>
        <input type="text" placeholder="Last Name" value={lastName} onChange={(event) => setLastName(event.target.value)}></input>
        <hr></hr>
        <input type="text" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)}></input>
        <hr></hr>
        <input type="text" placeholder="Username" value={username} onChange={(event) => setUsername(event.target.value)}></input>
        <hr></hr>
        <input type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)}></input>
        <hr></hr>
        <input type="password" placeholder="Re-type Password" value={secondPassword} onChange={(event) => setSecondPassword(event.target.value)}></input>
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
=======
    return <>
        <h2>Register</h2>
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
>>>>>>> dev
}

export default Register;