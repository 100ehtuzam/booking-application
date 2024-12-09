import React from 'react';
import {useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import { handleError, handleSuccess } from "../util";

function Login() {
  const [loginInfo,setLoginInfo] = useState({
    email: '',
    password:''
  });

  const navigate = useNavigate();


  const handleChange = (e)=>{
    const{name,value} = e.target;
    const copyLoginInfo = {...loginInfo};
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo)

    console.log('loginInfo ->',loginInfo)

  }

  const handleSubmit = async(e)=>{
    console.log('Login Clicked')
    e.preventDefault();
    const {email,password} = loginInfo;
    if(!email || ! password){
      return handleError(' email, password are required')
    }
    try {
      const url = 'http://localhost:8080/auth/login'
      const  response = await fetch(url,{
        method: 'POST',
        headers:{'content-type':'application/json'},
        body: JSON.stringify(loginInfo)
      }) ; 
      const result = await response.json();
      const {success,message,error,jwtToken,name,expiresIn} = result;
      console.log("Login result>>",result);
      if(success){
        handleSuccess(message);
        // expiresIn = Date.now() + expiresIn;
        localStorage.setItem('token',jwtToken);
        localStorage.setItem('LoggedInUser',name);
        localStorage.setItem('expiresIn',expiresIn+Date.now());
        setTimeout(()=>{
          navigate('/home')
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
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input 
          onChange={handleChange}
            type="email"
            name="email"
            placeholder="Enter Email.."
            // required
            value={loginInfo.email}

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
            value={loginInfo.password}

          />
        </div>
        <button type="submit">Login</button>
        <span>Don't have an account?
            <Link to = "/signup">Signup</Link>
        </span>
      </form>
      <ToastContainer/>
    </div>
  );
}

export default Login;
