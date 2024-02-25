// import React from 'react'
import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// import Home from './home'
import axios from 'axios';
import "../App.css";

const login = ({setToken}) => {
  const [username,setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false)
  let navigate = useNavigate();


  const handleLogin = async(e) => {
    e.preventDefault();
    let body ={
      username: username,
      password: password
    }
    try{
      const response = await axios.post("http://localhost:3000/users/login/",body);
      const token = response.data.token;
      console.log(response.data);
    //   const username = response.data.user;
    //   console.log(username)
      localStorage.setItem('token',token);
    //   localStorage.setItem('username',username);

      setToken(token);
      navigate('/profile/user');
    } catch(error){
      console.error('login Failed', error);
      setErr(true)
    }
  }
  return (
    <div className='body'>
      <br/><h2>Login</h2>
      <br/><form onSubmit={handleLogin}>
      <br/><input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <br/><input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br/><button type="submit">Login</button>
        {
          err && <div><p>Forgot password ??</p></div>
        }
      </form>
    </div>
  )
}

export default login