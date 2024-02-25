import React from 'react'
import '../App.css'
import { useState } from 'react'
import {Link} from 'react-router-dom'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Signup = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('') 
    const [data, setData] = useState('');

    const navigate= useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        let body = {username: username,
            emailId: email,
            password: password
        }
        try {
            let response = await Axios.post('http://localhost:3000/users/signup/', body);
            console.log("response: ",response.data );
            setData(response.data.userDetails);
            console.log(data);
        }catch(err){
            console.log(`error occured: ${err}`);
        }
        

    };
    return (
        <div className='sign-up-container'>
            <form className='sign-up-form' onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                <label htmlFor='username'>Username:</label>
                <input type="text" placeholder='Username'
                    onChange={(e) => setUsername(e.target.value)} />

                <label htmlFor='email'>Email:</label>
                <input type="email" autoComplete='off' placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor='password'>Password:</label>
                <input type="password" placeholder='*******'
                    onChange={(e) => setPassword(e.target.value)} />

                <button type='submit'>Sign Up</button>
                <p>Have An Account?<Link to='/Login'>Login</Link></p> 
            </form>
        </div>
    )
}

export default Signup;