import React from 'react'
import Navbar from './components/Navbar/Navbar'
import SideBar from './components/sider/SideBar'
import {Routes,Route} from "react-router-dom";
import Add from './pages/add/Add';
import List from './pages/list/List';
import Order from './pages/order/Order';

import { ToastContainer } from 'react-toastify';
function App() {
  const url = "http://localhost:4000";

  return (
    <div>
      <ToastContainer/>
  <Navbar/>
  <hr />
  <div className="app-content"> 
    <SideBar/>
    <Routes>
      <Route path="/add" element={<Add url={url}/>} />
      <Route path="/list" element={<List url={url}/>} />
      <Route path="/orders" element={<Order url={url}/>} />

    </Routes>
  </div>
    </div>
  )
}

export default App
