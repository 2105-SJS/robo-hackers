import React, {useState, useEffect} from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'

const Login = ({setLoggedIn, setToken, setUsername, setPassword, username, password, setUser}) => {
    const history = useHistory();
    const handleSubmit = async (ev) => {
        try {
            ev.preventDefault();
            const user = ({username: 'robo', password: 'hacker', token: 'robotoken'})
            const token = user.token;
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
        <h1>| Login |</h1>
        <form onSubmit = {handleSubmit}>
            <div>
            <input type="text" placeholder="username" value={username} onChange={(event) => setUsername(event.target.value)}></input>
                <hr></hr>
                <input type="password" placeholder="password" value={password} onChange={(event) => setPassword(event.target.value)}></input>
                <hr></hr>
                <button type="submit" disabled={!password || !username} class="btn btn-primary">Submit</button>
                <hr></hr>

            </div>
        </form>
    </>
}

export default Login;