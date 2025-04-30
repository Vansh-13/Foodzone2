import React, { useState, useContext } from 'react';
import "./LoginUp.css";
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/SroreContext';
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginUp({ setshowlogin }) {
  const [currstate, setcurrstate] = useState("Login");
  const { url, setToken } = useContext(StoreContext);
  const [data, setData] = useState({ name: "", email: "", password: "" });

  const onchange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url + (currstate === "Login" ? "/api/user/login" : "/api/user/register");

    try {
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        toast.success(response.data.message || "Login Successful", {
          className: "custom-toast-success",
          bodyClassName: "custom-toast-body",
        });
        setshowlogin(false);
      } else {
        toast.error(response.data.message || "Something went wrong", {
          className: "custom-toast-error",
          bodyClassName: "custom-toast-body",
        });
      }
    } catch (error) {
      toast.error("Error: " + error.response?.data?.message || "Server Error", {
        className: "custom-toast-error",
        bodyClassName: "custom-toast-body",
      });
    }
  };

  return (
    <div className='login-up'>
      <form className='login-up-container' onSubmit={onLogin}>
        <div className="login-up-title">
          <h2>{currstate}</h2>
          <img src={assets.cross_icon} onClick={() => setshowlogin(false)} alt="close" />
        </div>

        <div className="login-up-input">
          {currstate === "Sign Up" && (
            <input type="text" name='name' onChange={onchange} value={data.name} placeholder='Your name' required />
          )}
          <input name='email' onChange={onchange} value={data.email} type='email' placeholder='Your email' required />
          <input name='password' onChange={onchange} value={data.password} type='password' placeholder='Your password' required />
        </div>

        <button type='submit'>{currstate === "Sign Up" ? "Create account" : "Login"}</button>

        <div className="login-up-codition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>

        {currstate === "Login" ? (
          <p>Create a new account? <span onClick={() => setcurrstate("Sign Up")}>Click here</span></p>
        ) : (
          <p>Already have an account? <span onClick={() => setcurrstate("Login")}>Login here</span></p>
        )}
      </form>

      {/* Toast container with position */}
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </div>
  );
}

export default LoginUp;
