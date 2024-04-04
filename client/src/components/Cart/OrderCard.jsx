import React from 'react'
import {MdDelete} from 'react-icons/md'

export const OrderCard = ({name, image, price, quantity}) => {

  const imageUrl = image.startsWith('data:image')
  ? image
  : `data:image/jpeg;base64,${image}`;

  return (
    <div className='flex flex-row justify-between my-3 bg-white p-3 rounded-lg'>
      <div className='flex flex-row'>
        <img src={imageUrl} alt='No Image' className='h-[100px] rounded-lg'/>
        <div className='mx-3'>
          <p>{name}</p>
          <p className='text-lg font-semibold'>Rs. {price}</p>
        </div>
      </div>
      <div>
        <div className='mb-16 pl-5'><MdDelete size={23} className='text-gray-600 cursor-pointer hover:opacity-75'/></div>
        <div className='border border-slate-600 px-2 py-1 w-10 text-center rounded-lg'>{quantity}</div>
      </div>
    </div>
  )
}
