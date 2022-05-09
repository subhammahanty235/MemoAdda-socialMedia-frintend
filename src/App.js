import { useState } from 'react';
import Post from './components/Post/Post';
import './App.css'
import memories from './Images/memories.jpg'

import { useEffect } from 'react';

import Poststate from './context/Poststate';
import {BrowserRouter as Router , Routes ,Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import Login from './components/authentication/Login';
import Signup from './components/authentication/Signup';
import UserProfile from './components/UserProfile';
const App = () => {
  
  const [userDetails, setUserDtls] = useState([])

    const userdetails = async (req, res) => {
        const responce = await fetch('http://localhost:5000/auth/api/getdetails', {
            method: "GET",
            headers: {
                "auth-token": localStorage.getItem('memoapk_api_auth_token'),
                "Content-Type": "application/json",

            },
        })
        const resp = await responce.json();

        setUserDtls(resp)
        
        // console.log(resp)
    }
  useEffect(() => {
    userdetails()
    // console.log(userDetails)
  }, [])
  
  return (
    <>
      <Poststate>
    <div className="container">

        <Router>
          <Navbar imglink={userDetails.profilepic} />
          <Routes>
            <Route path='/' element={<Post userName={userDetails.name}/>}/>
            <Route path = '/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/myprofile' element={<UserProfile/>}/>
          </Routes>
        </Router>
         

    </div>
        
        
      </Poststate>
    </>
  )
}
export default App;