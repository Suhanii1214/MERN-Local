import React, { useEffect, useState } from 'react'
import {FaHeart} from 'react-icons/fa6'
import {FaChevronRight} from 'react-icons/fa'
import order from '../../assets/shopping-bag.png'
import coupon from '../../assets/coupon.png'
import payment from '../../assets/atm-card.png'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser, updateUserInfo } from '../../redux/actions/authActions'
import { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router'

export const Profile = () => {

  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const user = useSelector((state) => state.auth.user)
  // console.log(user);

  const navigate = useNavigate()

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    contact: 0,
    address: ''
  })

  useEffect(() => {
    if(isAuthenticated) {
      dispatch(loadUser())
    }
  },[dispatch, isAuthenticated])

  useEffect(() => {
    setUserData({
      name: user?.name || '',
      email: user?.email || '',
      contact: user?.contact || 0,
      address: user?.address || '',
    })
  },[user])

  const handleChange = (e) => {
    setUserData({...userData, [e.target.name]: e.target.value})
  }

  const handleUpdate = (e) => {
    dispatch(updateUserInfo(userData))
  }

  return <>
  <Toaster position='top-center' reverseOrder={false}></Toaster>
  <h2 className='text-3xl font-bold m-5'>Profile</h2>
  <div className='grid grid-cols-2 m-5'>
    <div className='col-span-1 h-screen flex flex-col'>
      <div className='flex flex-col m-2'>
        <label htmlFor='name'>Name:</label>
        <input
          type='name'
          name='name'
          value={userData.name}
          onChange={handleChange}
          className='bg-gray-100 rounded-md py-2 px-2'
        />
      </div>
      <div className='flex flex-col m-2'>
        <label htmlFor='email'>Email:</label>
        <input
          type='email'
          name='email'
          value={userData.email}
          onChange={handleChange}
          className='bg-gray-100 rounded-md py-2 px-2'
        />
      </div>
      <div className='flex flex-col m-2'>
        <label htmlFor='contact'>Contact No. :</label>
        <input
          type='number'
          name='contact'
          value={userData.contact}
          onChange={handleChange}
          className='bg-gray-100 rounded-md py-2 px-2'
        />
      </div>
      <div className='flex flex-col m-2'>
        <label htmlFor='address'>Delivery Address:</label>
        <textarea
          type='address'
          name='address'
          value={userData.address}
          onChange={handleChange}
          className='bg-gray-100 rounded-md py-2 px-2'
        />
      </div>
      <button onClick={handleUpdate} className='bg-black text-white hover:opacity-70 py-2 mx-2 my-3 rounded-md'>Update</button>
   </div> 
  <div className='col-span-1 mt-5 ml-3'>
    <div onClick={() => navigate("/wishlist")} className='flex flex-row justify-between hover:bg-slate-100 cursor-pointer border-2 text-lg border-gray-200 rounded-md my-4 py-5 px-4'>
      <div className='flex flex-row'>
        <FaHeart size={34} color='#e2067f' className='m-1'/>
        <span className='mt-1 mx-1'>Wishlist</span>
      </div>
      <FaChevronRight color='gray' className='mt-3'/>
    </div>
    <div onClick={() => navigate(`/myorders/${user._id}`)} className='flex flex-row justify-between hover:bg-slate-100 cursor-pointer border-2 text-lg border-gray-200 rounded-md my-4 py-5 px-4'>
      <div className='flex flex-row'>
        <img src={order} width={45} className='mr-1'/>
        <span className='mt-2 mx-1'>Orders</span>
      </div>
      <FaChevronRight color='gray' className='mt-3'/>
    </div>
    <div className='flex flex-row justify-between hover:bg-slate-100 cursor-pointer border-2 text-lg border-gray-200 rounded-md my-4 py-5 px-4'>
      <div className='flex flex-row'>
        <img src={coupon} width={45} className='mr-1'/>
        <span className='mt-2 mx-1'>My Coupons</span>
      </div>
      <FaChevronRight color='gray' className='mt-3'/>
    </div>
    <div className='flex flex-row justify-between hover:bg-slate-100 cursor-pointer border-2 text-lg border-gray-200 rounded-md my-4 py-5 px-4'>
      <div className='flex flex-row'>
        <img src={payment} width={45} className='mr-1'/>
        <span className='mt-2 mx-1'>Payment Options</span>
      </div>
      <FaChevronRight color='gray' className='mt-3'/>
    </div>
  </div>
</div>
</>

}
