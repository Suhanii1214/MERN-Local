import React from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router'

export const PaymentSuccess = () => {
  const navigate = useNavigate()

  return (
    <div className='flex flex-col items-center justify-center h-96'>
      <FaCheckCircle color='#42b540' size={70} className='mt-10 mb-5'/>
      <p className='text-3xl my-1 font-bold text-[#42b540]'>Payment Successful!</p>
      <p className='text-xl my-2 font-medium'>Your Order is Confirmed</p>
      <div className='m-5'>
        <button onClick={() => navigate('/myorders')} className='bg-black mx-3 px-3 py-2 text-white text-lg font-semibold rounded-lg hover:opacity-75'>View Orders</button>
        <button onClick={() => navigate('/store')} className='bg-gray-300 text-lg font-semibold mx-3 px-3 py-2 rounded-lg hover:opacity-80'>Go to Store</button>
      </div>
    </div>
  )
}
