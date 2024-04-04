//FilterSection.js
import React from 'react'
import { HiSearch } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { categoryFilter, priceFilter } from '../../../redux/reducers/itemSlice'
import { useNavigate } from 'react-router'

export const FilterSection = () => {
    const {selectedCategories, selectedPrices} = useSelector(state => state.item)
    console.log(selectedPrices);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleCategory = (category) => {
            dispatch(categoryFilter(category));
    }

    const handlePrice = (price) => {
        dispatch(priceFilter(price));
}

  return (
    <div className='m-4'>
        <h2 className='text-xl font-semibold'>Filters</h2>
        <div onClick={() => navigate('/search')} className='flex flex-row bg-gray-200 rounded-lg px-2 my-4'>
        <HiSearch size={18} color='gray' className='mt-2'/>
        <input
            placeholder='Search'
            className='px-1 py-1 bg-gray-200 rounded-lg'
        />
        </div>
        <div className='my-3'>
            <p className='text-lg font-semibold'>Category</p>
            <ul>
                <li>
                    <input
                        type='checkbox'
                        className='p-5 m-2'
                        onChange={() => handleCategory("Tops")}
                    />
                    Tops
                </li>
                <li>
                    <input
                        type='checkbox'
                        className='p-5 m-2'
                        onChange={() => handleCategory("Jeans")}
                    />
                    Jeans
                </li>
                <li>
                    <input
                        type='checkbox'
                        className='p-5 m-2'
                        onChange={() => handleCategory("Kurtas")}
                    />
                    Kurtas
                </li>
                <li>
                    <input
                        type='checkbox'
                        className='p-5 m-2'
                        onChange={() => handleCategory("Handbags")}
                    />
                    Handbags
                </li>
                <li>
                    <input
                        type='checkbox'
                        className='p-5 m-2'
                        onChange={() => handleCategory("Jewellery")}
                    />
                    Jewellery
                </li>
                <li>
                    <input
                        type='checkbox'
                        className='p-5 m-2'
                        onChange={() => handleCategory("Heels")}
                    />
                    Heels
                </li>
            </ul>
        </div>
        <div className='my-3'>
            <p className='text-lg font-semibold'>Price</p>
            <ul>
                <li>
                    <input
                        type='radio'
                        name='priceFilter'
                        className='p-5 m-2'
                        onChange={() => handlePrice("Below Rs.499")}
                    />
                    <label htmlFor='Below Rs.499'>Below Rs.499</label>
                </li>
                <li>
                    <input
                        type='radio'
                        name='priceFilter'
                        className='p-5 m-2'
                        onChange={() => handlePrice("Rs.499 - Rs.1,999")}
                    />
                    <label htmlFor='Rs.499 - Rs.1,999'>Rs.499 - Rs.1,999</label>
                </li>
                <li>
                    <input
                        type='radio'
                        name='priceFilter'
                        className='p-5 m-2'
                        onChange={() => handlePrice("Rs.1,999 - Rs.4,999")}
                    />
                    <label htmlFor='Rs.1,999 - Rs.4,999'>Rs.1,999 - Rs.4,999</label>
                </li>
                <li>
                    <input
                        type='radio'
                        name='priceFilter'
                        className='p-5 m-2'
                        onChange={() => handlePrice("Rs.4,999 - Rs.9,999")}
                    />
                    <label htmlFor='Rs.4,999 - Rs.9,999'>Rs.4,999 - Rs.9,999</label>
                </li>
                <li>
                    <input
                        type='radio'
                        name='priceFilter'
                        className='p-5 m-2'
                        onChange={() => handlePrice("Rs.9,999 - Rs.14,999")}
                    />
                    <label htmlFor='Rs.9,999 - Rs.14,999'>Rs.9,999 - Rs.14,999</label>
                </li>
                <li>
                    <input
                        type='radio'
                        name='priceFilter'
                        className='p-5 m-2'
                        onChange={() => handlePrice("Above Rs.14,999")}
                    />
                    <label htmlFor='Above Rs.14,999'>Above Rs.14,999</label>
                </li>
            </ul>
        </div>
    </div>
  )
}
