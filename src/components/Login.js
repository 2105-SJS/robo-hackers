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
        console.log("USER OBJECT AFTER LOGGING IN", loginObj.user);
        history.push('/products');
      }
    } catch (error) {
      throw error;
    }
  }

  return <>
    <h1>| Login |</h1>
    <form onSubmit = {handleSubmit}>
      <div>
        <input type="text" placeholder="username" value={username} onChange={(event) => setUsername(event.target.value)}></input>
        <hr></hr>
        <input type="password" placeholder="password" value={password} onChange={(event) => setPassword(event.target.value)}></input>
        <hr></hr>
        <button type="submit" disabled={!password || !username}>Submit</button>
        <hr></hr>
      </div>
      <div>New? Click here to <Link to = '/register'>register</Link> </div>
    </form>
  </>
}

export default Login;