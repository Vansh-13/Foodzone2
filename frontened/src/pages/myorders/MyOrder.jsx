import React, { useContext, useEffect, useState } from 'react';
import './MyOrder.css';

import axios from 'axios';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/SroreContext'; 

function MyOrder() {
  const { url, token } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        `${url}/api/order/userorders`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setOrders(response.data.data || []);
      } else {
        console.warn("No success in response");
      }
    } catch (error) {
      console.error("Failed to fetch orders", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="container">
          {orders.map((order, index) => (
            <div className="my-orders-order" key={index}>
              <img src={assets.parcel_icon} alt="Parcel Icon" />

              <p className="items">
                {(order.items || []).map((item, idx) =>
                  idx === order.items.length - 1
                    ? `${item.name} x ${item.quantity}`
                    : `${item.name} x ${item.quantity}, `
                )}
              </p>

              <p><strong>Amount:</strong> ₹{order.amount}</p>
              <p><strong>Items:</strong> {order.items?.length}</p>

              <p className={`status ${order.status?.toLowerCase()}`}>
                <span>&#x25cf;</span> <b>{order.status}</b>
              </p>

              <button className="track-btn">Track Order</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyOrder;
