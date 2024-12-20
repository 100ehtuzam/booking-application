import React from "react";
import {useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import { handleError, handleSuccess } from "../util";

function Signup() {
  const [signupInfo,setSignupInfo] = useState({
    name: '',
    email: '',
    password:''
  });

  const navigate = useNavigate();


  const handleChange = (e)=>{
    const{name,value} = e.target;
    console.log(name,value);
    const copySignupInfo = {...signupInfo};
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo)

    console.log('loginInfo ->',signupInfo)

  }

  const handleSubmit = async(e)=>{
    console.log('Signup Clicked')
    e.preventDefault();
    const {name,email,password} = signupInfo;
    if(!name || !email || ! password){
      return handleError('name, email, password are required')
    }
    try {
      const url = 'https://booking-application-okby.onrender.com/auth/signup'
      const  response = await fetch(url,{
        method: 'POST',
        headers:{'content-type':'application/json'},
        body: JSON.stringify(signupInfo)
      }) ; 
      const result = await response.json();
      const {success,message,error} = result;
      if(success){
        handleSuccess(message);
        setTimeout(()=>{
          navigate('/login')
        },2000);
      }else if(error){
        const details = error?.details[0].message;
        handleError(details);
      }else if(!success){
        handleError(message);
      }
      console.log(result) ;
    } catch (error) {
      handleError(error);
    }
  }
  return (
    <div className="auth-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            onChange={handleChange}
            type="text"
            name="name"
            autoFocus
            placeholder="Enter Name.."
            // required
            value={signupInfo.name}
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input 
          onChange={handleChange}
            type="email"
            name="email"
            placeholder="Enter Email.."
            // required
            value={signupInfo.email}

          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Enter Password.."
            // required
            value={signupInfo.password}

          />
        </div>
        <button type="submit">Signup</button>
        <span>Already have an account?
            <Link to = "/login">Login</Link>
        </span>
      </form>
      <ToastContainer/>
    </div>
  );
}

export default Signup;
