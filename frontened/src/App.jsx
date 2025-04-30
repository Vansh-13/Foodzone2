import React, { useState } from 'react'
import Navbar from './compontents/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './compontents/Footer/Footer'
// import Payment from './pages/Payment/payment'
import LoginUp from './compontents/LoginUp/LoginUp'
import {  ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/verify/Verify'
import MyOrder from './pages/myorders/MyOrder'
function App() {
  const[showlogin,setshowlogin]=useState(false);
  return (
    <>
    <ToastContainer position="top-right" autoClose={3000} />
    {
      showlogin?<LoginUp setshowlogin={setshowlogin}/>:<></>

    }
    <div className='app'>
      <Navbar setshowlogin={setshowlogin}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<PlaceOrder/>}/>
        {/* <Route path="/payment" element={<Payment/>} /> */}
        <Route path="/verify" element={<Verify/>}/>
        <Route path='/myorders' element={<MyOrder/>}/>
      </Routes>
      <Footer/>
    </div>
    
    </>
  )
}

export default App
