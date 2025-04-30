import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/SroreContext';
import Navbar from '../../compontents/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const { carItem, getTotal,food_list, removeFromCart,url } = useContext(StoreContext);
  const navigate = useNavigate();
const navigat=()=>{
  navigate('/order');
}
  const subtotal = food_list.reduce((acc, item) => {
    const quantity = carItem[item._id] || 0;
    return acc + item.price * quantity;
  }, 0);

  const deliveryFee = subtotal > 0 ? 30 : 0;
  const total = getTotal() + deliveryFee;

  return (
    
    <div className="cart-container">
      <h2>Your Cart</h2>
      <div className="cart-items">
        {food_list.map((item) => {
          if (carItem[item._id] > 0) {
            return (
              <div className="cart-item" key={item._id}>
                <img src={url+"/images/"+item.image} alt={item.name} />
                <div className="cart-info">
                  <h4>{item.name}</h4> 
                  <p>₹{item.price} X {carItem[item._id]}</p>
                  <p className="item-total">Total: ₹{item.price * carItem[item._id]}</p>
                </div>
                <button className="remove-btn" onClick={() => removeFromCart(item._id)}>Remove</button>
              </div>
            );
          }
          return null;
        })}
      </div>

      {subtotal > 0 && (
        <div className="cart-summary">
          <h3>Summary</h3>
          <div className="summary-line">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="summary-line">
            <span>Delivery</span>
            <span>₹{deliveryFee}</span>
          </div>
          <div className="summary-line total">
            <strong>Total</strong>
            <strong>₹{total}</strong>
          </div>
          <button onClick={navigat} className="checkout-btn">Checkout</button>
        </div>
      )}

      <div className="promo-section">
        <p>Have a promo code?</p>
        <div className="promo-input">
          <input type="text" placeholder="Enter code" />
          <button>Apply</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
