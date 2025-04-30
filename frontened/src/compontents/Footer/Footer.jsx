import React from 'react';
import './Footer.css';
import { assets } from '../../assets/assets';

function Footer() {
  return (
    <div className="footer" id="footer">
      <div className="footer-top">
        <div className="footer-column">
          <div className="footer-logo">FoodZone</div>
          <p>Serving delicious meals at your doorstep. Fast, hygienic, and full of flavor!</p>
          <div className="footer-socials">
            <img src={assets.facebook_icon} alt="Facebook" />
            <img src={assets.twitter_icon} alt="Twitter" />
            <img src={assets.linkedin_icon} alt="LinkedIn" />
          </div>
        </div>

        <div className="footer-column">
          <h3>Quick Links</h3>
          <ul>
            <li>Home</li>
            <li>Menu</li>
            <li>Offers</li>
            <li>Contact</li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Contact Us</h3>
          <ul>
            <li>📞 +91-7037191676</li>
            <li>📧 madaanvansh68@gmail.com</li>
            <li>📍 Uttarakhand, India</li>
          </ul>
        </div>
      </div>

      <hr />

      <div className="footer-bottom">
        © 2025 FoodZone. Crafted with ❤️ by Vansh Madaan.
      </div>
    </div>
  );
}

export default Footer;
