import Axios from 'axios'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  Axios.defaults.withCredentials = true;
  // const handleLogout =( )=>{
   
  //   axios.get('/http://localhost:3000/auth/logout')
  //   .then(res => {
  //     if(res.data.status){
  //       navigate('/login')
  //     }

  //   }).catch(err =>{
  //     console.log(err);
  //   })
  // }
  const handleLogout = async (e) => {
    e.preventDefault();
    // let body = {username: username,
    //     emailId: email,
    //     password: password
    // }
    try {
        let response = await Axios.post('http://localhost:3000/users/logout/');
        console.log("response: ",response.data );
        setData(response.data.user_profile);
        console.log(data);
    }catch(err){
        console.log(`error occured: ${err}`);
    }
    

};
  return (
    <div>Home
      <button><Link to='/dashboard'></Link>Dashboard</button>
      <br/> <br/>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Home