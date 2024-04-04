import React from 'react'
import {FaCheckCircle} from 'react-icons/fa'

export const Premium = () => {
  return <div className='m-5'>
    <h2 className='font-bold text-center text-5xl m-2 mb-5'>Get Premium</h2>
    <p className='text-xl text-center text-gray-600 mb-5'>Unlock the best offers and gifts by choosing the best plan for yourself.</p>
    <div className='grid grid-cols-3'>
      <div className='col-span-1 border-2 rounded-2xl p-5 mx-3'>
        <h2 className='text-xl font-bold mb-5'>3 months</h2>
        <p className='text-lg text-gray-500 mb-5'>The essentials to provide your best work for clients.</p>
        <h1 className='text-xl font-bold mb-8'><span className='text-4xl'>Rs. 499</span>/month</h1>
        <ul>
          <li className='mb-3 flex flex-row text-gray-500'> <FaCheckCircle color='#27c924' size={25} className='mx-2'/> Get Free Delivery</li>
          <li className='mb-3 flex flex-row text-gray-500'> <FaCheckCircle color='#27c924' size={25} className='mx-2'/> Buy 1 Get 1 Offers</li>
          <li className='mb-3 flex flex-row text-gray-500'> <FaCheckCircle color='#27c924' size={25} className='mx-2'/> 20% extra discounts</li>
          <li className='mb-3 flex flex-row text-gray-500'> <FaCheckCircle color='#27c924' size={25} className='mx-2'/> Exchange Offers</li>
        </ul>
        <button className='bg-black text-white hover:opacity-80 font-semibold p-2 mt-10 w-full rounded-lg'>Buy Plan</button>
      </div>
      <div className='col-span-1 border-2 rounded-2xl p-5 mx-3'>
        <h2 className='text-xl font-bold mb-5'>6 months</h2>
        <p className='text-lg text-gray-500 mb-5'>The essentials to provide your best work for clients.</p>
        <h1 className='text-xl font-bold mb-8'><span className='text-4xl'>Rs. 999</span>/month</h1>
        <ul>
          <li className='mb-3 flex flex-row text-gray-500'> <FaCheckCircle color='#27c924' size={25} className='mx-2'/> Get Free Delivery</li>
          <li className='mb-3 flex flex-row text-gray-500'> <FaCheckCircle color='#27c924' size={25} className='mx-2'/> Buy 1 Get 1 Offers</li>
          <li className='mb-3 flex flex-row text-gray-500'> <FaCheckCircle color='#27c924' size={25} className='mx-2'/> 20% extra discounts</li>
          <li className='mb-3 flex flex-row text-gray-500'> <FaCheckCircle color='#27c924' size={25} className='mx-2'/> Exchange Offers</li>
        </ul>
        <button className='bg-black text-white hover:opacity-80 font-semibold p-2 mt-10 w-full rounded-lg'>Buy Plan</button>
      </div>
      <div className='col-span-1 border-2 rounded-2xl p-5 mx-3'>
        <h2 className='text-xl font-bold mb-5'>12 months</h2>
        <p className='text-lg text-gray-500 mb-5'>The essentials to provide your best work for clients.</p>
        <h1 className='text-xl font-bold mb-8'><span className='text-4xl'>Rs. 1499</span>/month</h1>
        <ul>
          <li className='mb-3 flex flex-row text-gray-500'> <FaCheckCircle color='#27c924' size={25} className='mx-2'/> Get Free Delivery</li>
          <li className='mb-3 flex flex-row text-gray-500'> <FaCheckCircle color='#27c924' size={25} className='mx-2'/> Buy 1 Get 1 Offers</li>
          <li className='mb-3 flex flex-row text-gray-500'> <FaCheckCircle color='#27c924' size={25} className='mx-2'/> 20% extra discounts</li>
          <li className='mb-3 flex flex-row text-gray-500'> <FaCheckCircle color='#27c924' size={25} className='mx-2'/> Exchange Offers</li>
        </ul>
        <button className='bg-black text-white hover:opacity-80 font-semibold p-2 mt-10 w-full rounded-lg'>Buy Plan</button>
      </div>
    </div>
  </div>
}
