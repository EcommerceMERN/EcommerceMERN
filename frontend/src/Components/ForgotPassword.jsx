import React from 'react'
import '../App.css'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')

    const navigate= useNavigate()

    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     Axios.post('http://localhost:3000/auth/forgot-password', { 
    //         email,  
    //     }).then(response =>{
    //         if(response.data.status){
    //             alert("Check your email for reset password link")
    //             navigate('/login')
    //         }
            
    //     }).catch(err =>{
    //         console.log(err)
    //     })
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();
        let body = {emailId: email}
        try {
            let response = await Axios.post('http://localhost:3000/users/forgotPassword/');
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
        <h2>Forgot Password</h2>
        
        <label htmlFor='email'>Email:</label>
        <input type="email" autoComplete='off' placeholder='Email'
            onChange={(e) => setEmail(e.target.value)} />

        <button type='submit'>Send</button>
      
    </form>
</div>
  )
}

export default ForgotPassword