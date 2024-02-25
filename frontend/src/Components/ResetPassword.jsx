import React from 'react'
import '../App.css'
import Axios from 'axios'
import { Link,useNavigate, useParams } from 'react-router-dom'
const ResetPassword = () => {
    const [password, setPassword] = useState('')
    const {token}=useParams()
   
    const navigate= useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        let body = {username: username,
            emailId: email,
            password: password
        }
        try {
            let response = await Axios.post('http://localhost:3000/users/resetPassword/'+token);
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
        <h2>Reset Password</h2>
        
        
        <label htmlFor='password'>New Password:</label>
                <input type="password" placeholder='*******'
                    onChange={(e) => setPassword(e.target.value)} />

        <button type='submit'>Reset</button>
      
    </form>
</div>
  )
}

export default ResetPassword