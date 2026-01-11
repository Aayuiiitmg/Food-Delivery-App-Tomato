import React, { useContext, useEffect } from 'react';
import './Verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get('success');
  const orderId = searchParams.get('orderId');

  // 1. Destructure 'token' and 'url' from Context
  const { url, token } = useContext(StoreContext); 
  const navigate = useNavigate(); // Ensure parentheses () are here

  const verifyPayment = async () => {
    try {
      // 2. Pass token in headers (usually required for order routes)
      const response = await axios.post(
        `${url}/api/order/verify`, 
        { success, orderId }, 
        { headers: { token } } 
      );

      if (response.data.success) {
        navigate('/myorders');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.log("Verification Error:", error.response?.data || error.message);
      navigate('/');
    }
  };

  useEffect(() => {
    // Only verify if url is loaded
    if (url) {
      verifyPayment();
    }
  }, [url]); // Adding url as dependency ensures it runs when context is ready

  return (
    <div className='verify'>
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;