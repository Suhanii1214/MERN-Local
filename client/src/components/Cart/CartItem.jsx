import React, { useEffect, useState } from 'react'
import {MdDelete} from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { removeItemFromCart } from '../../redux/actions/cartActions'

export const CartItem = ({userId, id, name, image, price, quantity, handleQuantityChange, handleDeleteItem}) => {

  const [count, setCount] = useState(quantity)
  const [rate, setRate] = useState(price)
  const [visible, setVisible] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    setRate(price * count)
  },[count, price])

  const handleIncrement = () => {
    setCount((prev) => prev + 1)
    handleQuantityChange(id, count + 1, rate + price);
  }

  const handleDecrement = () => {
    if(count > 1) {
      setCount((prev) => prev - 1)
      handleQuantityChange(id, count - 1, rate - price);
    }
    return 0
  }

  const handleDelete = () => {
    dispatch(removeItemFromCart(userId, id))
    handleDeleteItem(id, rate);
    setVisible(false)
  }

    const imageUrl = image.startsWith('data:image')
    ? image
    : `data:image/jpeg;base64,${image}`;

  return <>
    {visible ? (
      <div className='grid grid-cols-3 mb-6 p-5 border-2 rounded-xl'>
    <div className='mx-4'>
        <img src={imageUrl} alt='No Image Available' className='rounded-xl h-[200px]'/>
    </div>
    <div className='col-span-2 text-md items-center'>
        <div>
          <p className='my-3'>{name}</p>
          <p className='text-lg font-semibold'>Rs. {rate}</p>
        </div>
          <div className='flex bg-gray-100 px-3 py-2 w-28 rounded-lg justify-between my-5'>
            <span className='cursor-pointer' onClick={handleDecrement}>-</span>
            <span>{count}</span>
            <span className='cursor-pointer' onClick={handleIncrement}>+</span>
          </div>
          <MdDelete size={30} className='cursor-pointer text-gray-600 hover:opacity-75' onClick={handleDelete}/>
    </div>
  </div>
    ) : null}
  </>
}
