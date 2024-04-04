import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { HiShoppingBag, HiUser, HiSearch } from 'react-icons/hi'
import {FaCircle} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCart } from '../redux/actions/cartActions'

const Navbar = () => {
    const [count, setCount] = useState(0)
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    const userId = useSelector((state) => state.auth.user?.id)
    const {cartItems} = useSelector(state => state.cart)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if(isAuthenticated) {
            dispatch(fetchCart(userId))
        }
        setCount(cartItems?.items?.length)
    },[isAuthenticated, dispatch, userId, cartItems?.items?.length])

    const handleUser = () => {
        if(isAuthenticated) {
            navigate(`/user/${userId}`)
        } else {
            navigate("/login")
        }
    }

  return <header className=' w-full h-16 bg-white shadow-md sticky top-0 z-10'>
    <div className='flex flex-row justify-between'>
        <div className='p-2 ml-5 mt-1'>
            <ul className='flex flex-row items-center gap-5'>
                <li onClick={() => navigate('/')} className=' ml-3 mr-5 cursor-pointer font-bold text-2xl'>BE:BOLD</li>
                <li onClick={() => navigate('/store')} className='text-black font-bold mt-1 cursor-pointer'>Our Store</li>
                {/* <li onClick={() => navigate('/premium')} className='text-[#ddbe42] font-bold px-3 py-1 mt-1 border border-[#ddbe42] rounded-full cursor-pointer'>Premium</li> */}
            </ul>
        </div>
        <div className='p-4 mt-1 mr-3'>
            <ul className='flex flex-row items-center gap-7'>
                <li className='cursor-pointer' onClick={() => navigate("/search")}> <HiSearch size={25}/> </li>
                <li className='cursor-pointer' onClick={handleUser}>
                    {isAuthenticated ? <HiUser size={25}/> : "Log In"}
                </li>
                <li className='mr-3 cursor-pointer relative' onClick={() => navigate(`/cart/${userId}`)}>
                <div className='relative'>
                    <HiShoppingBag size={25} />
                    {count > 0 ? (
                        <div className='absolute px-[6px] bg-red-500 rounded-full text-sm text-white font-semibold top-0 right-0 transform translate-x-1/2 -translate-y-1/2'>
                            {count}
                        </div>
                    ): null
                    }
                </div>
                </li>
            </ul>
        </div>
    </div>
  </header>
}

export default Navbar