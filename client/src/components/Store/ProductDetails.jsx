// ProductDetails.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { addItemToCart } from '../../redux/actions/cartActions';

export const ProductDetails = () => {
    const [quantity, setQuantity] = useState(1)
    const dispatch = useDispatch()
    const {cartItems} = useSelector(state => state.cart)
    console.log(cartItems);
    const { id } = useParams();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    const {user} = useSelector((state) => state.auth)
    console.log(user);
    const product = useSelector((state) => state.item.items.find((item) => item._id === id));

    if (!product) {
        return <p>Product not found</p>;
    }

    const { title, price, description, image } = product;
    const imageUrl = image.startsWith('data:image')
    ? image
    : `data:image/jpeg;base64,${image}`;

    const handleIncrement = () => {
        setQuantity((prev) => prev + 1)
    }

    const handleDecrement = () => {
        setQuantity((prev) => {
            if(prev === 1) return 1
            return prev - 1
        })
    }

    const handleAddToCart = () => {
        if(isAuthenticated) {
            dispatch(addItemToCart(user.id, id, quantity))
        } else {
            alert("Please LOG IN to add items to cart")
        }
    }

    return (
    <div className='grid grid-cols-3 m-10'>
        <div className='border'>
            <img src={imageUrl} alt="No Image Available" />
        </div>
        <div className='col-span-2 border pl-5'>
            <div className='text-3xl font-semibold my-5'>{title}</div>
            <div className='text-xl font-medium my-5'>Rs. {price}</div>
            <div className='w-72'>{description}</div>
            <div className='flex border-2 px-3 py-2 w-28 justify-between my-5'>
                <span className='cursor-pointer' onClick={handleDecrement}>-</span>
                <span>{quantity}</span>
                <span className='cursor-pointer' onClick={handleIncrement}>+</span>
            </div>
            <button className='font-bold px-5 py-2 bg-black text-white rounded my-3 hover:opacity-70' onClick={handleAddToCart}>
                Add to Cart
            </button>
            <button className='font-bold px-5 py-2 rounded my-3 mx-3 border-2 border-black hover:opacity-50'>
                BUY NOW
            </button>
        </div>
    </div>
  );
};
