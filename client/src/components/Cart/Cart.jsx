import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCart } from '../../redux/actions/cartActions'
import { CartItem } from './CartItem'
import {BsFillBagXFill} from 'react-icons/bs'
import { useNavigate } from 'react-router'

export const Cart = () => {
    const { cartItems } = useSelector((state) => state.cart)
    console.log(cartItems);
    const {user} = useSelector((state) => state.auth)
    const {isAuthenticated} = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [subtotal, setSubtotal] = useState(cartItems.bill)

    useEffect(() => {
        if(isAuthenticated) {
            dispatch(fetchCart(user?.id))
        }
    },[isAuthenticated, dispatch, user?.id])

    // Function to handle quantity change
    const handleQuantityChange = (itemId, newQuantity, newRate) => {
        // Update the quantity in the cartItems state
        const updatedCartItems = cartItems.items.map((item) => {
            if (item._id === itemId) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        // Calculate the new subtotal
        const newSubtotal = updatedCartItems.reduce((total, item) => total + item.quantity * item.price, 0);
        // Update the subtotal
        setSubtotal(newSubtotal);
    };

    const handleDeleteItem = (itemId, itemRate) => {
        // Remove the item from the cartItems state
        const updatedCartItems = cartItems.items.filter((item) => item._id !== itemId);
        // Calculate the new subtotal
        const newSubtotal = updatedCartItems.reduce((total, item) => total + item.quantity * item.price, 0);
        // Update the subtotal
        setSubtotal(newSubtotal);
    };

    return <>
        {(isAuthenticated && cartItems?.items?.length > 0) 
        ? (
            <div>
        <h2 className='text-3xl font-bold m-5'>Shopping Cart</h2>
        <div className='grid grid-cols-5 m-5'>
        <div className='col-span-3 m-5'>
            {cartItems?.items?.map((item) => {
                return <CartItem
                    key={item._id}
                    userId={user?.id}
                    id={item._id}
                    name={item.name}
                    image={item.image}
                    price={item.price}
                    quantity={item.quantity}
                    handleQuantityChange={handleQuantityChange}
                    handleDeleteItem={handleDeleteItem}
                />
            })}
        </div> 
        <div className='m-5 px-5 py-5 bg-gray-100 rounded-lg h-80 w-[450px]'>
            <h5 className='text-xl font-bold'>Order Summary</h5>
            <div className='flex flex-row justify-between my-3'>
            <p>Subtotal:</p>
            <p>Rs. {subtotal}</p>
        </div>
        <div className='flex flex-row justify-between my-3'>
            <p>Shipping Charges:</p>
            <p>Rs.60</p>
        </div>
        <hr/>
        <div className='flex flex-row justify-between my-3 text-lg font-semibold'>
            <p>Total:</p>
            <p>Rs.{subtotal + 60}</p>
        </div>
        <hr/>
        <button onClick={() => navigate(`/checkout/${user?.id}`)} className='bg-black text-white font-semibold hover:opacity-70 py-3 mx-2 mt-10 mb-5 rounded-lg w-full'>CheckOut</button>
        </div>
    </div>
    </div>
    ) : (
        <div className='flex flex-col items-center my-16'>
            <BsFillBagXFill size={150} color='rgb(156 163 175)'/>
            <p className='my-5 text-3xl text-gray-400 font-bold'>Your Cart is Empty!</p>
            <p className='text-xl font-medium'>You have no items in your shopping bag</p>
            <p className='mb-7 text-xl font-medium'>Let's go buy something!</p>
            <button onClick={() => navigate('/store')} className='bg-black text-white text-xl font-semibold px-3 py-2 hover:opacity-75 rounded-lg'>Shop Now</button>
        </div>
    )
        }
    </>
}