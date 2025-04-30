import React from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <h1 className="brand-name">FoodZone</h1>
        <p className="admin-badge">Admin Panel</p>
      </div>
      <div className="navbar-right">
        <img src={assets.profile_image} alt="Profile" className="profile-pic" />
      </div>
    </div>
  );
}

export default Navbar;
