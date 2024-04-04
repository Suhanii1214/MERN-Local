import React from 'react'
import poster1 from '../assets/posters/poster1.png'
import poster2 from '../assets/posters/poster2.png'
import poster3 from '../assets/posters/poster3.png'
import poster6 from '../assets/posters/poster6.png'
import { useNavigate } from 'react-router'

const Home = () => {

  const navigate = useNavigate()

  return <div className='flex flex-row mx-3 my-3 justify-between'>
    <div className='mt-20 mx-5'>
        <h2 className='text-9xl font-bold'>Get Latest</h2>
        <h2 className='text-9xl font-bold'>Trends.</h2>
        <p className='text-xl ml-6'>Shop the exclusive collections at best prices</p>
        <button onClick={() => navigate('/store')} className='py-2 px-10 bg-black text-white font-semibold rounded-lg mx-6 my-3'>SHOP NOW</button>
    </div>
    <div className='flex flex-row gap-3 mr-5 m-5'>
    <div>
        <img src={poster1} width={190} className='mb-4'/>
        <img src={poster2} width={190}/>
    </div>
    <div>
        <img src={poster3} width={230} className='mb-4'/>
        <img src={poster6} width={232}/>
    </div>
    </div>
  </div>
}

export default Home