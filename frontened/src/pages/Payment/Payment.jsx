import React, { useContext, useState } from 'react';
import './Payment.css';
import { useLocation } from 'react-router-dom';
import { StoreContext } from '../../context/SroreContext';

function Payment() {
  const location = useLocation();
  const { address, orderItems, totalAmount } = location.state || {};
  const { carItem, food_list } = useContext(StoreContext);

  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  return (
    <div className="payment-container">
      <div className="order-summary">
        <h2>Pay Course</h2>
        <h1>₹{totalAmount + 30}.00</h1>
        <ul>
          {orderItems.map((item, index) => (
            <li key={index}>
              <div>{item.name}</div>
              <div>Qty {item.quantity}</div>
              <div>₹{item.price * item.quantity}</div>
            </li>
          ))}
          <li>
            <div>Delivery Charges</div>
            <div>Qty 1</div>
            <div>₹30</div>
          </li>
        </ul>
      </div>

      <div className="payment-form">
        <h3>Pay with card</h3>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" defaultValue={address?.email} required />
          <input type="text" placeholder="Card Number" required />
          <div className="input-group">
            <input type="text" placeholder="MM / YY" required />
            <input type="text" placeholder="CVV" required />
          </div>
          <input
            type="text"
            placeholder="Cardholder name"
            defaultValue={`${address?.firstName} ${address?.lastName}`}
            required
          />
          <select defaultValue={address?.country || 'India'}>
            <option>India</option>
            <option>USA</option>
          </select>
          <button type="submit">Pay</button>
        </form>
      </div>

      {showToast && <div className="toast">Payment Successful!</div>}
    </div>
  );
}

export default Payment;
