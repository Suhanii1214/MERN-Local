import React from 'react'
import {FaFacebookSquare, FaTwitter, FaYoutube, FaInstagramSquare} from 'react-icons/fa'

export const Footer = () => {
  return (
    <div className=' bg-gray-100'>
    <div className='flex flex-row px-10 pt-10 justify-around'>
        <div>
            <h4 className='text-lg font-bold text-gray-500 my-2'>Shopping:</h4>
            <ul className='text-gray-500 cursor-pointer'>
                <li>Western Wear</li>
                <li>Traditionals</li>
                <li>Lounge Wear</li>
                <li>Footwear</li>
                <li>Accessories</li>
            </ul>
        </div>
        <div>
            <h4 className='text-lg font-bold text-gray-500 my-2'>Help:</h4>
            <ul className='text-gray-500 cursor-pointer'>
                <li>About Us</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
                <li>Terms & Conditions</li>
                <li>FAQ</li>
            </ul>
        </div>
        <div>
            <h4 className='text-lg font-bold text-gray-500 my-2'>Keep In Touch:</h4>
            <ul className='text-gray-500 flex flex-row gap-4 cursor-pointer'>
                <li><FaFacebookSquare size={30} className='hover:text-blue-600'/></li>
                <li><FaTwitter size={30} className='hover:text-blue-500'/></li>
                <li><FaYoutube size={30} className='hover:text-red-600'/></li>
                <li><FaInstagramSquare size={30} className='hover:text-pink-500'/></li>
            </ul>
        </div>
    </div>
    <p className='text-md bg-[#dedfe5] text-center mt-10 py-3 text-gray-500'>© 2024 www.bebold.com. All rights reserved.</p>
    </div>
  )
}
