import React from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
const LoginPopup = ({ setShowLogin }) => {

  const {url,setToken}=React.useContext(StoreContext);
  const [currState, setCurrState] = React.useState("Login");
  const [data,setData]=useState({
    name:"",
    email:"",
    password:""
  })

  const onChangeHandler=(event)=>{
    const name=event.target.name;
    const value=event.target.value;
    setData(data=>({
      ...data,
      [name]:value
    }))
  }
const onLogin = async (event) => {
  event.preventDefault();

  try {
    let newUrl = url;

    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register"; 
    }

    const response = await axios.post(newUrl, data);

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
    } else {
      alert("Error: " + response.data.message);
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong. Check console.");
  }
};
  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            src={assets.cross_icon}
            alt="close"
            onClick={() => setShowLogin(false)}
          />
          /
          </div>
          <div className="login-popup-inputs">
            {currState === "Login" ? null : <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required />}
            <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' required />
            <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
          </div>
          <button type='submit'>{currState === "Sign Up" ? "Create Account" : "Login"}</button>
          <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing,I agree to the privacy policy.</p>
          </div>
          {currState === "Login" ?  <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>: <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>}          
      </form>
    </div>
  );
};

export default LoginPopup;
