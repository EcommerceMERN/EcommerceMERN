import { useState } from 'react'
import { BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Login from '../src/components/login'
import './App.css'
import SignUp from '../src/components/signup';
import Home from '../src/components/homepage';

function App() {
  const [count, setCount] = useState(0);
  const [token, setToken] = useState(null);

  return (
    <>
    <div className='body'>
    <BrowserRouter>
      <Routes>
      <Route path='users/signup' element = {<SignUp/>}/>
        <Route path='users/login' element = {<Login setToken={setToken}/>}/>
        <Route path="/profile/user" element={token ? <Home /> : <Navigate to="users/login"/>}/>
      </Routes>
    </BrowserRouter>
    </div>
    </>
  )
}

export default App
