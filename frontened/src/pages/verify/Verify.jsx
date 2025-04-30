import React, { useEffect, useContext } from 'react';
import "./Verify.css";
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import { StoreContext } from '../../context/SroreContext';
import { toast } from 'react-toastify';

function Verify() {
    const [search] = useSearchParams();
    const success = search.get("success");
    const orderId = search.get("orderId");
    const { url } = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async () => {
        try {
            const response = await axios.post(url + "/api/order/verify", {
                success,
                orderId
            });

            if (response.data.success) {
               toast.success("Payment success");
               
                navigate("/myorders");
            } else {
                navigate("/");
            }
        } catch (error) {
            console.error("Payment verification failed:", error.message);
            navigate("/");
        }
    };

    useEffect(() => {
        verifyPayment();
    }, []);

    return (
        <div className='verify'>
            <div className="spinner"></div>
        </div>
    );
}

export default Verify;
