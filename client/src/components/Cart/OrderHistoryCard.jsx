import React from 'react'
import { useNavigate } from 'react-router';

export const OrderHistoryCard = ({orderNumber, paymentId, date, items, bill, name, address, contact}) => {

    const navigate = useNavigate()
    const formattedDate = new Date(date).toDateString();
    console.log(formattedDate);

  return (
    <div className='my-5 border rounded-lg'>
        <div className='flex flex-row justify-between p-5'>
            <ul className='flex flex-row gap-10'>
                <li>
                    <p className='font-semibold'>Order Number</p>
                    <p className='text-[15px] text-gray-600'>{orderNumber}</p>
                </li>
                <li>
                    <p className='font-semibold'>Payment ID</p>
                    <p className='text-[15px] text-gray-600'>{paymentId}</p>
                </li>
                <li>
                    <p className='font-semibold'>Order Date</p>
                    <p className='text-[15px] text-gray-600'>{formattedDate}</p>
                </li>
            </ul>
            <div>
                <p className='font-semibold'>Total Bill</p>
                <p className='text-[20px] font-bold'>Rs. {bill}</p>
            </div>
        </div>
        <hr/>
        <ul className='px-5'>
            {items.map((item) => {
                const imageUrl = item.image.startsWith('data:image') ? item.image : `data:image/jpeg;base64,${item.image}`;

                return <li className='flex flex-row py-5'>
                    <img src={imageUrl} alt='No Image Available' className='rounded-xl h-[200px]'/>
                    <div>
                        <p className='mb-1 mx-8'>{item.name}</p>
                        <p className='mx-8'>Quantity: {item.quantity}</p>
                        <p className='text-lg font-semibold my-2 mx-8'>Rs. {item.price}</p>
                        <button onClick={() => navigate('/item/' + item.productId)} className='bg-black text-white font-semibold px-3 py-2 mt-16 ml-[860px] hover:opacity-75 rounded-lg'>View Product</button>
                    </div>
                </li>
            })}
        </ul>
        <hr/>
        <div className='m-5'>
            <h4 className='text-lg font-semibold pb-2'>Shipping Information</h4>
            <p className=''>Name: {name}</p>
            <p>Contact: {contact}</p>
            <p>Address: {address}</p>
        </div>
    </div>
  )
}
