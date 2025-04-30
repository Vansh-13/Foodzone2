import React, { useState, useEffect } from 'react';
import "./Order.css";
import axios from 'axios';
import { toast } from "react-toastify";
import { assets } from '../../assets/assets';

function Order({ url }) {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: event.target.value
      });

      if (response.data.success) {
        toast.success("Status updated!");
        fetchAllOrders(); // Refresh order list after update
      } else {
        toast.error("Error updating order status");
      }
    } catch (error) {
      toast.error("Something went wrong while updating status");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div>
      <div className="order-add">
        <h3>Order Page</h3>
        <div className="order-list">
          {orders.length === 0 ? (
            <p>No orders available</p>
          ) : (
            orders
              .filter(order => order.items && order.address)
              .map((order) => (
                <div key={order._id} className="order-item">
                  <img src={assets.parcel_icon} alt="Parcel Icon" />

                  <div>
                    <p className="order-item-food">
                      {(order.items || []).map((item, i) =>
                        i === order.items.length - 1
                          ? `${item.name} x ${item.quantity}`
                          : `${item.name} x ${item.quantity}, `
                      )}
                    </p>
                  </div>

                  <div>
                    <p className="order-item-name">
                      {order.address?.firstName} {order.address?.lastName}
                    </p>
                    <div className="order-item-address">
                      <p>{order.address?.street},</p>
                      <p>
                        {order.address?.city}, {order.address?.state}, {order.address?.country} - {order.address?.zipcode}
                      </p>
                    </div>
                    <p className="order-item-phone">{order.address?.phone}</p>
                  </div>

                  <div>
                    <p>Items: {order.items?.length}</p>
                    <p>₹{order.amount}.00</p>
                  </div>

                  <div>
                    <select value={order.status} onChange={(event) => statusHandler(event, order._id)}>
                      <option value="Food Processing">Food Processing</option>
                      <option value="Out for delivery">Out for delivery</option>
                      <option value="Delivery">Delivery</option>
                    </select>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Order;
