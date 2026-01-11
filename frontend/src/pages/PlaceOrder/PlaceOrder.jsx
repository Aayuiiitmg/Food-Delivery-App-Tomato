import React, { useContext, useState, useEffect } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom' // Optional but good for navigation

const PlaceOrder = () => {
    const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext)
    const navigate = useNavigate();

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        phone: ""
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    }

    const placeOrder = async (event) => {
        event.preventDefault(); // This ensures HTML 'required' fields are checked first
        
        try {
            let orderItems = [];
            food_list.map((item) => {
                if (cartItems[item._id] > 0) {
                    // CRITICAL: Copy the item object so you don't mutate the state
                    let itemInfo = { ...item, quantity: cartItems[item._id] };
                    orderItems.push(itemInfo);
                }
            })

            let orderData = {
                address: data,
                items: orderItems,
                amount: getTotalCartAmount() + 50,
            }

            // Make sure the endpoint matches your backend route exactly
            let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });

            if (response.data.success) {
                // We renamed the backend key to session_url, but if your backend 
                // sends 'session_url', use that. If it sends 'url', use response.data.url
                const { session_url } = response.data;
                window.location.replace(session_url);
            } else {
                alert("Error: " + response.data.message);
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong. Check if your backend is running.");
        }
    }

    // Optional: Redirect user if they try to visit /order with an empty cart
    useEffect(() => {
        if (!token) {
            navigate('/cart');
        } else if (getTotalCartAmount() === 0) {
            navigate('/cart');
        }
    }, [token])

    return (
        <form onSubmit={placeOrder} className='place-order'>
            <div className="place-order-left">
                <p className="title">Delivery information</p>
                <div className="multi-fields">
                    <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' />
                    <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' />
                </div>
                <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' />
                <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
                <div className="multi-fields">
                    <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
                    <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
                </div>
                <div className="multi-fields">
                    <input required name='zipCode' onChange={onChangeHandler} value={data.zipCode} type="text" placeholder='Zip Code' />
                    <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
                </div>
                <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Total</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Delivery Fee</p>
                            <p>${getTotalCartAmount() === 0 ? 0 : 50}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 50}</b>
                        </div>
                    </div>
                    {/* REMOVED onClick={placeOrder} from here because onSubmit is on the <form> */}
                    <button type='submit' className='proceed-payment-btn'>
                        PROCEED TO PAYMENT
                    </button>
                </div>
            </div>
        </form>
    )
}

export default PlaceOrder