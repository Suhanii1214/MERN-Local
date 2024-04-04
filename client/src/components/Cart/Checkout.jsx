import React, { useEffect, useState } from 'react'
import { OrderCard } from './OrderCard'
import { useNavigate, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { initiateCheckout } from '../../redux/actions/orderActions'
import icon from '../../assets/icon.png'
import axios from 'axios'

export const Checkout = () => {
    const [source, setSource] = useState({
        userId: '',
        shippingInfo: null,
        items: [],
        bill: null,
    });
    const [shippingInfo, setShippingInfo] = useState({
        fullName: "",
        contact: 0,
        address: ""
    })
    console.log(shippingInfo);
    const [shippingInfoEntered, setShippingInfoEntered] = useState(false)
    const { cartItems } = useSelector(state => state.cart)
    console.log(cartItems);
    const totalAmount = cartItems.bill + 60
    const dispatch = useDispatch()
    const { userId } = useParams()
    console.log(userId);
    const {user} = useSelector(state => state.auth)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setShippingInfo({...shippingInfo, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (shippingInfo.fullName && shippingInfo.contact && shippingInfo.address) {
            setShippingInfoEntered(true);
            setSource({
                ...source,
                userId: userId,
                shippingInfo: shippingInfo,
                items: cartItems.items,
                bill: totalAmount,
            });
        } else {
            alert('Please enter all details before submitting.');
        }
    }

    console.log(source);

    const checkoutHandler = () => {

        // Disable Pay Now button if shipping information is not entered
        if (!shippingInfoEntered) {
            alert('Please enter shipping information and submit before proceeding.');
            return;
        }

        dispatch(initiateCheckout(userId, source))
        .then((response) => {
            console.log("Response Data: ", response);

            const options = {
                key: import.meta.env.VITE_APP_RAZORPAY_KEY_ID,
                amount: response.razorpayOrder.amount,
                currency: "INR",
                name: "Suhani Singh",
                description: "BE:BOLD Ecommerce",
                image: icon,
                order_id: response.razorpayOrder.id,
                handler: async function (response) {
                    const body = {
                      ...response,
                      ...source
                    };
                    
                    axios.post('/api/paymentverification', body)
                    .then(res => {
                        navigate("/paymentsuccess")
                    })
                    .catch(err => console.log(err))
                },
                prefill: {
                    name: user.name,
                    email: user.email,
                    contact: user.contact
                },
                theme: {
                    "color":"#7096b5", 
                }
            }
    
            const razor = new window.Razorpay(options)
            razor.open()
        })
        .catch((err) => {
            console.log(err);
        })
    }

  return <div className='m-5'>
    <h2 className='text-3xl font-bold'>Checkout</h2>
    <div className='grid grid-cols-2 my-5'>
    <div className='col-span-1 h-screen p-5'>
        <div className='mb-5'>
            <h2 className='text-lg font-semibold my-3'>Contact Information</h2>
            <label htmlFor='email' className='m-1'>Email address</label>
            <input
                type='email'
                name='email'
                value={user.email}
                placeholder='Enter Email'
                className='bg-gray-100 w-full px-3 py-1 my-2 rounded-lg'
            />
        </div>
        <hr/>
        <form onSubmit={handleSubmit} className='mt-5'>
            <h2 className='text-lg font-semibold my-3'>Shipping Information</h2>
            <div className='my-3'>
                <label htmlFor='name' className='m-1'>Full Name</label>
                <input
                    type='text'
                    name='fullName'
                    value={shippingInfo.fullName}
                    onChange={handleChange}
                    placeholder='Enter Full Name'
                    className='bg-gray-100 w-full px-3 py-1 my-2 rounded-lg'
                />
            </div>
            <div className='my-3'>
                <label htmlFor='contact' className='m-1'>Contact No.</label>
                <input
                    type='number'
                    name='contact'
                    value={shippingInfo.contact}
                    onChange={handleChange}
                    
                    placeholder='Enter Contact No.'
                    className='bg-gray-100 w-full px-3 py-1 my-2 rounded-lg'
                />
            </div>
            <div className='my-3'>
                <label htmlFor='address' className='mx-1'>Address</label>
                <textarea
                    type='text'
                    name='address'
                    value={shippingInfo.address}
                    onChange={handleChange}
                    placeholder='Enter Address'
                    className='bg-gray-100 w-full px-3 py-1 my-2 rounded-lg'
                />
            </div>
            <button className='bg-black text-white font-semibold hover:opacity-70 py-3 mt-5 mb-5 rounded-lg w-full'>Submit</button>
        </form>
    </div>
    <div className='p-5'>
        <h2 className='text-lg font-semibold my-3'>Order Summary</h2>
        <div className='bg-gray-100 rounded-xl p-5'>
        {cartItems?.items?.map((item) => (
            <OrderCard
                key={item._id}
                name={item.name}
                image={item.image}
                price={item.price}
                quantity={item.quantity}
            />
        ))}
        <hr/>
        <div className='flex flex-row justify-between my-3'>
            <p>Subtotal:</p>
            <p>Rs.{cartItems.bill}</p>
        </div>
        <div className='flex flex-row justify-between my-3'>
            <p>Shipping Charges:</p>
            <p>Rs.60</p>
        </div>
        <hr/>
        <div className='flex flex-row justify-between my-3 text-lg font-semibold'>
            <p>Total:</p>
            <p>Rs. {cartItems.bill+60}</p>
        </div>
        <hr/>
        <button 
            disabled={!shippingInfoEntered}  
            onClick={checkoutHandler} 
            className='bg-black text-white font-semibold hover:opacity-70 disabled:opacity-70 disabled:cursor-not-allowed py-3 mx-2 mt-10 mb-5 rounded-lg w-full'
        >
            Pay Now
        </button>
        </div>
    </div>
    </div>
</div>
}
