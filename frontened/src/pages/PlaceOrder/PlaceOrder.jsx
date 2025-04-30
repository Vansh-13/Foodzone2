import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/SroreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';

function PlaceOrder() {
  const {
    getTotal,
    token,
    food_list,
    carItem,
    url,
    setCarItem
  } = useContext(StoreContext);

  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });

  const deliveryFee = 2;
  const subtotal = getTotal();
  const total = subtotal + deliveryFee;

  const onChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    if (!token) {
      toast.error('Please login to place order.');
      navigate('/login');
      return;
    }

    let orderItems = [];

    food_list.forEach((item) => {
      if (carItem[item._id] > 0) {
        orderItems.push({
          ...item,
          quantity: carItem[item._id]
        });
      }
    });

    const orderData = {
      address: data,
      items: orderItems,
      amount: total,
      userId: localStorage.getItem('userId')
    };

    try {
      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        toast.error('Something went wrong. Try again!');
      }
    } catch (error) {
      console.error('Order Error:', error);
      if (error.response?.status === 401) {
        toast.error('Unauthorized. Please login again.');
        navigate('/login');
      } else {
        toast.error('Failed to place order. Please try again.');
      }
    }
  }
  const naviage=useNavigate();
useEffect(()=>{
if(!token){
naviage('/cart');

}else if(getTotal()==0){
  naviage('/cart')
}
},[token])
  return (
    <div className="place-order-container">
      <ToastContainer />
      <form className="place-order-form" onSubmit={placeOrder}>
        <div className="place-order-left">
          <h2>Delivery Information</h2>

          <div className="input-group">
            <input
              type="text"
              name="firstName"
              value={data.firstName}
              onChange={onChange}
              placeholder="First Name"
              required
            />
            <input
              type="text"
              name="lastName"
              value={data.lastName}
              onChange={onChange}
              placeholder="Last Name"
              required
            />
          </div>

          <input
            type="email"
            name="email"
            value={data.email}
            onChange={onChange}
            placeholder="Email Address"
            required
          />
          <input
            type="text"
            name="street"
            value={data.street}
            onChange={onChange}
            placeholder="Street"
            required
          />

          <div className="input-group">
            <input
              type="text"
              name="city"
              value={data.city}
              onChange={onChange}
              placeholder="City"
              required
            />
            <input
              type="text"
              name="state"
              value={data.state}
              onChange={onChange}
              placeholder="State"
              required
            />
          </div>

          <div className="input-group">
            <input
              type="text"
              name="zipcode"
              value={data.zipcode}
              onChange={onChange}
              placeholder="Zip Code"
              required
            />
            <input
              type="text"
              name="country"
              value={data.country}
              onChange={onChange}
              placeholder="Country"
              required
            />
          </div>

          <input
            type="text"
            name="phone"
            value={data.phone}
            onChange={onChange}
            placeholder="Phone Number"
            required
          />
        </div>

        <div className="place-order-right">
          <div className="summary-card">
            <h3>Order Summary</h3>

            <div className="summary-line">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="summary-line">
              <span>Delivery Fee</span>
              <span>₹{deliveryFee}</span>
            </div>
            <div className="summary-line total">
              <strong>Total</strong>
              <strong>₹{total}</strong>
            </div>

            <button type="submit" className="pay-btn">
              Place Order
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PlaceOrder;























// import React, { useContext, useState } from 'react';
// import './PlaceOrder.css';
// import { StoreContext } from '../../context/SroreContext';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function PlaceOrder() {
//   const { getTotal, token, food_list, carItem, url, setCarItem } = useContext(StoreContext);
//   const navigate = useNavigate();

//   const [data, setData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     street: "",
//     city: "",
//     state: "",
//     zipcode: "",
//     country: "",
//     phone: ""
//   });

//   const onChange = (event) => {
//     const { name, value } = event.target;
//     setData((prevData) => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const placeOrder = async (event) => {
//     event.preventDefault();

    
//     const isValid = Object.values(data).every(field => field.trim() !== "");
//     if (!isValid) {
//       toast.warning("Please fill in all delivery details.");
//       return;
//     }

//     let orderItems = [];

//     food_list.forEach((item) => {
//       const quantity = carItem?.[item._id] || 0;
//       if (item && item._id && quantity > 0) {
//         let iteminfo = { ...item, quantity };
//         orderItems.push(iteminfo);
//       }
//     });


//     let orderData = {
//       address: data,
//       items: orderItems,
//       amount: getTotal() + 30
//     };

//     try {
//       const response = await axios.post(`${url}/api/order/place`, orderData, {
//         headers: {
//           token
//         }
//       });

//       if (response.status === 200) {
//         toast.success("Order placed successfully!");
//         setCarItem({});
//         navigate("/payment", {
//           state: {
//             address: data,
//             orderItems,
//             totalAmount: total
//           }
//         });
        
//       } else {
   
//         toast.error("Something went wrong while placing the order.");
//       }
//     } catch (error) {
//       console.error("Order placement failed:", error);
//       toast.error("Failed to place order. Please try again later.");
//     }
//   };

//   // Order Summary
//   const subtotal = getTotal();
//   const deliveryFee = subtotal > 0 ? 30 : 0;
//   const total = subtotal + deliveryFee;

//   return (
//     <div className="place-order-container">
//       <form className="place-order-form" onSubmit={placeOrder}>
//         <div className="place-order-left">
//           <h2>Delivery Information</h2>

//           <div className="input-group">
//             <input type="text" name="firstName" value={data.firstName} onChange={onChange} placeholder="First Name" />
//             <input type="text" name="lastName" value={data.lastName} onChange={onChange} placeholder="Last Name" />
//           </div>

//           <input type="email" name="email" value={data.email} onChange={onChange} placeholder="Email Address" />
//           <input type="text" name="street" value={data.street} onChange={onChange} placeholder="Street" />

//           <div className="input-group">
//             <input type="text" name="city" value={data.city} onChange={onChange} placeholder="City" />
//             <input type="text" name="state" value={data.state} onChange={onChange} placeholder="State" />
//           </div>

//           <div className="input-group">
//             <input type="text" name="zipcode" value={data.zipcode} onChange={onChange} placeholder="Zip Code" />
//             <input type="text" name="country" value={data.country} onChange={onChange} placeholder="Country" />
//           </div>

//           <input type="text" name="phone" value={data.phone} onChange={onChange} placeholder="Phone Number" />
//         </div>

//         <div className="place-order-right">
//           <div className="summary-card">
//             <h3>Order Summary</h3>

//             <div className="summary-line">
//               <span>Subtotal</span>
//               <span>₹{subtotal}</span>
//             </div>
//             <div className="summary-line">
//               <span>Delivery Fee</span>
//               <span>₹{deliveryFee}</span>
//             </div>
//             <div className="summary-line total">
//               <strong>Total</strong>
//               <strong>₹{total}</strong>
//             </div>

//             <button type="submit" className="pay-btn">
//               Place Order
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default PlaceOrder;
