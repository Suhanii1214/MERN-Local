import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from '../redux/actions/itemActions';
import { Product } from './Store/Product';

export const Search = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.item.items);
  const loading = useSelector((state) => state.item.loading);

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    // Dispatch the action to fetch items (you may want to debounce this to avoid excessive API calls)
    dispatch(fetchItems());
  };

  const filteredItems = items?.filter((item) =>
    item?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2 className='text-3xl font-bold m-5'>Search</h2>
      <div className='m-5 flex flex-row items-center mx-72'>
        <input
          type='text'
          placeholder='Search for products...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='bg-slate-100 rounded-md py-2 px-2 w-screen'
        />
        <button
          className='bg-black text-white hover:opacity-70 py-2 px-3 mx-2 rounded-md'
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      {loading ? (
        <p className='text-center text-lg'>Loading...</p>
      ) : (
          filteredItems.length === 0 ? (
            <p className='text-center text-lg'>No matching products found.</p>
          ) : (
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 m-5">
              {filteredItems.map((product) => (
                <Product
                    key={product._id}
                    productId={product._id}
                    title={product.title}
                    price={product.price}
                    description = {product.description}
                    image={product.image}  // Replace 'image' with the actual property name in your data
                />
              ))}
              </div>  
          )
      )}
    </div>
  );
};
