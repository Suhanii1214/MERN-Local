import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { sortItems } from '../../../redux/reducers/itemSlice'

export const SortSection = () => {

  const dispatch = useDispatch()
  const [selectedSort, setSelectedSort] = useState('')

  const handleSort = (e) => {
    console.log(e.target.value);
    setSelectedSort(e.target.value)

    dispatch(sortItems(selectedSort))
  }

  return (
    <div className='flex flex-row justify-between m-5'>
        <h2 className='text-2xl font-bold my-5'>All Products</h2>
        <div className='flex flex-col mx-5 my-5'>
            <select onChange={handleSort} className='border-2 border-gray-200 rounded-lg px-2 py-1'>
                <option>Sort</option>
                <option>Most Popular</option>
                <option>New Arrivals</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
            </select>
        </div>
    </div>
  )
}
