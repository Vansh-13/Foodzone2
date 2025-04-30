import React, { useState, useContext } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { FaBars } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/SroreContext';

function Navbar({ setshowlogin }) {
  const [menu, setMenu] = useState("home");
  const navigate=useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const { getTotal, token, setToken } = useContext(StoreContext);
const logout=()=>{
localStorage.removeItem("token");
setToken(null);
navigate("/");
}
  const handleMenuClick = (item) => {
    setMenu(item);
    setShowDropdown(false);
  };

  return (
    <div className='navbar'>
      <div className="navbar-left">
        <Link to="/"><h1 className="text-logo">FoodZone</h1></Link>
      </div>

      <ul className={`navbar-menu ${showDropdown ? 'active' : ''}`}>
        <Link to="/" onClick={() => handleMenuClick("home")} className={menu === "home" ? 'active' : ''}>Home</Link>
        <a href="#explore-menu" onClick={() => handleMenuClick("menu")} className={menu === "menu" ? 'active' : ''}>Menu</a>
        <a href="#app-download" onClick={() => handleMenuClick("mobile-app")} className={menu === "mobile-app" ? 'active' : ''}>Mobile App</a>
        <a href="#footer" onClick={() => handleMenuClick("contact-us")} className={menu === "contact-us" ? 'active' : ''}>Contact Us</a>
      </ul>

      <div className="navbar-right">
        <img src={assets.search_icon} alt="search" className='nav-icon' />
        <div className="navbar-cart-icon">
          <Link to="/cart"><img src={assets.basket_icon} alt="cart" className='nav-icon' /></Link>
          {getTotal() > 0 && <div className="dot" />}
        </div>

        {!token ? (
          <button onClick={() => setshowlogin(true)} className="signin-btn">Sign In</button>
        ) : (
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="profile" />
            <ul className="navbar-profile-droption">
              <li onClick={()=>{
                navigate('/myorders')
              }}><img src={assets.bag_icon} alt="orders" /><p>Orders</p></li>
              <hr />
              <li onClick={logout}><img src={assets.logout_icon} alt="logout" /><p>Logout</p></li>
            </ul>
          </div>
        )}

        <FaBars className="hamburger" onClick={() => setShowDropdown(!showDropdown)} />
      </div>
    </div>
  );
}

export default Navbar;
