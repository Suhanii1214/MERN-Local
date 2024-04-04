//Wishlist.jsx
import React from 'react'
import { useSelector } from 'react-redux'

export const Wishlist = () => {

    const { wishlistItems } = useSelector(state => state.item)
    console.log(wishlistItems);

  return (
    <div>
      <h2>Your Wishlist</h2>
      {wishlistItems?.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <ul>
          {wishlistItems.map((item) => (
            <li key={item.productId}>
              <p>{item.title}</p>
              <p>Rs. {item.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>

  )
}
