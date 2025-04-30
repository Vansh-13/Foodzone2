import React from 'react';
import "./Header.css";

function Header() {
  return (
    <div className='header'>
      <div className="header-contents">
        <h2>Welcome to FoodZone</h2>
        <p>Delicious food, quick service, and happy moments. Order now and enjoy!</p>
        <button>View Menu</button>
      </div>
    </div>
  );
}

export default Header;
