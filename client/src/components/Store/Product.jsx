// Product.jsx
import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router';
import {FaHeart, FaRegHeart} from 'react-icons/fa6'
import { useDispatch } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../../redux/reducers/itemSlice';

export const Product = ({productId, title, price, description, image}) => {
  const [wishlist, setWishlist] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // console.log(productId);
  const imageUrl = image.startsWith('data:image') ? image : `data:image/jpeg;base64,${image}`;

  const handleWishlist = () => {
    setWishlist((prev) => !prev);

    const newItem = {
      productId,
      title,
      price,
      description,
      imageUrl,
    };

    if (wishlist) {
      // If wishlist is true, remove item from wishlist
      dispatch(removeFromWishlist(productId));
    } else {
      // If wishlist is false, add item to wishlist
      dispatch(addToWishlist(newItem));
    }
  };

  return (
            <div key={productId} className="group">
              <div className="relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <img
                    src={imageUrl}
                    alt="No Image Available"
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <div onClick={handleWishlist}>
                  {wishlist ? <FaHeart size={23} className="absolute top-2 right-2 text-pink-600 cursor-pointer" />
                   : <FaRegHeart size={23} className="absolute top-2 right-2 text-gray-700 cursor-pointer" />
                  }
                </div>
              </div>
              <div className='cursor-pointer' onClick={() => navigate('/item/' + productId)}>
                <h3 className="mt-4 text-sm text-gray-700 cursor-pointer">{title}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900 cursor-pointer">Rs. {price}</p>
              </div>
            </div>
  );
};
