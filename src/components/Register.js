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
        history.push('/products');
      }
            
    } catch (error) {
      throw error;
    }
  }
    
  return <>
  <div className='register-page'>
    <form className = 'register-form' onSubmit = {handleSubmit}>
      <h1>Register</h1>
      <div class="form-group">
        <label className = 'user-input' for="inputFirstName6">First Name:</label>
        <input type="text" class="form-control mx-sm-3" aria-describedby="passwordHelpInline" value={firstName} onChange={(event) => setFirstName(event.target.value)}></input>
        <label className = 'user-input' for="inputLastName6">Last Name:</label>
        <input type="text" class="form-control mx-sm-3" aria-describedby="passwordHelpInline" value={lastName} onChange={(event) => setLastName(event.target.value)}></input>
        <label className = 'user-input' for="inputEmail6">Email:</label>
        <input type="text" class="form-control mx-sm-3" aria-describedby="passwordHelpInline" value={email} onChange={(event) => setEmail(event.target.value)}></input>
        <label className = 'user-input' for="inputUsername6">Username:</label>
        <input type="text" class="form-control mx-sm-3" aria-describedby="passwordHelpInline" value={username} onChange={(event) => setUsername(event.target.value)}></input>
        <label className = 'user-input' for="inputPassword6">Password:</label>
        <input type="password" id="inputPassword6" class="form-control mx-sm-3" aria-describedby="passwordHelpInline" value={password} onChange={(event) => setPassword(event.target.value)}></input>
        <small id="passwordHelpInline" class="text-muted">Must be 8-20 characters long.</small>
        <label className = 'user-input' for="inputPassword6">Re-type password:</label>
        <input type="password" id="inputPassword6" class="form-control mx-sm-3" aria-describedby="passwordHelpInline" value={secondPassword} onChange={(event) => setSecondPassword(event.target.value)}></input>
        <br></br>
        <button type="submit" disabled={!password || !username || password.length <8 || password !== secondPassword} class="btn btn-info">Submit</button> 
        {
          password !== secondPassword && <span>Passwords do not match!</span>
        }
      </div>
    </form>
  </div>
  </>
}

export default Register;
