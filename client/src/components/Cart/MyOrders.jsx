//MyOrders.jsx
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { fetchOrders } from '../../redux/actions/orderActions'
import { OrderHistoryCard } from './OrderHistoryCard'

export const MyOrders = () => {

  const { userId } = useParams()
  const dispatch = useDispatch()
  const {isAuthenticated} = useSelector(state => state.auth)
  const {orders} = useSelector((state) => state.order)
  console.log(orders);

  useEffect(() => {
    if(isAuthenticated) {
      dispatch(fetchOrders(userId))
    }
  },[isAuthenticated, userId, dispatch])

  return (
    <div className='my-7 mx-10'>
      <h2 className='text-2xl font-bold my-2'>Order History</h2>
      <p className='mb-6 text-gray-600'>Check the status of recent orders, manage returns, and discover similar products.</p>
        {orders.map(item => (
          <OrderHistoryCard
            key={item._id}
            orderNumber={item._id}
            paymentId={item.razorpay_payment_id}
            date={item.date_added}
            items={item.items}
            bill={item.bill}
            name={item.fullName}
            address={item.address}
            contact={item.contact}
          />
        ))}
    </div>
  )
}
