// Login.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { login } from '../../redux/actions/authActions'; 
import { Toaster } from 'react-hot-toast';

export const Login = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '' });

  const { email, password } = formData;

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dispatch the login action
    dispatch(login({ email, password }))
  };

  return (
    <div className='flex flex-col mt-10 mx-96 py-14 items-center bg-black justify-center border'>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
      <h2 className='text-2xl font-bold m-3 text-white'>Welcome Back!</h2>
      <form onSubmit={handleSubmit} className=' justify-center'>
        <div className='my-6'>
          <label className=' text-lg text-white font-semibold py-2'>Email:</label>
          <input 
            type="email" 
            name="email" 
            value={email} 
            onChange={handleChange}
            placeholder='Enter email' 
            required 
            className='w-full text-white px-3 py-1 bg-black border border-white rounded-md'
            />
        </div>
        <div className='my-6'>
          <label className=' text-lg text-white font-semibold py-2'>Password:</label>
          <input 
            type="password" 
            name="password" 
            value={password} 
            onChange={handleChange} 
            placeholder='Enter password'
            required 
            className='w-full text-white px-3 py-1 bg-black border border-white rounded-md'
            />
        </div>
        <div className='my-6 ml-20'>
        <button type="submit" className='text-lg text-white bg-black hover:text-black hover:bg-white font-bold border-2 border-white rounded-md px-8 py-1.5'>Login</button>
        </div>
      </form>
      <p className='text-white'>Not a member? <span onClick={() => navigate("/signup")} className='font-bold cursor-pointer'>SignUp</span></p>
    </div>
  );
};

