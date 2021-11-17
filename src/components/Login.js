import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { callAPI } from '../api';

const Login = ({setLoggedIn, setToken, setUsername, setPassword, username, password, setUser}) => {
  const history = useHistory();
  const handleSubmit = async (ev) => {
    try {
      ev.preventDefault();
      const loginObj = await callAPI({
        method: 'POST',
        url: 'users/login',
        body: {
          username: username,
          password: password
        }
      })
      if (loginObj.token) {
        localStorage.setItem('token', loginObj.token);
        localStorage.setItem('username', username);
        setToken(loginObj.token);
        setLoggedIn(true);
        setUsername('');
        setPassword('');
        setUser(loginObj.user);
        
        history.push('/products');
      }
    } catch (error) {
      throw error;
    }
  }

  return <>
    <h1 className = 'login-header'>Login</h1>
    <br></br>
    <form className = 'form-input' onSubmit = {handleSubmit}>
    <div class="form-group">
      <label className = 'user-input' for="inputUsername6">Username:</label>
      <input className = 'form-input' type="text" class="form-control mx-sm-3" aria-describedby="passwordHelpInline" value={username} onChange={(event) => setUsername(event.target.value)}></input>
      
      <br></br>
      <label className = 'user-input' for="inputPassword6">Password:</label>
      <input className = 'form-input' type="password" id="inputPassword6" class="form-control mx-sm-3" aria-describedby="passwordHelpInline" value={password} onChange={(event) => setPassword(event.target.value)}></input>
      
      
      <button type="submit" disabled={!password || !username} class="btn btn-info">Submit</button>
    </div>
      <br></br>
      <div id = 'link-to-register'>New? Click here to <Link to = '/register'>register</Link> </div>
    </form>
  </>
}

export default Login;
