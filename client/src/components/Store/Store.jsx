// Store.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from '../../redux/actions/itemActions';  
import { Product } from './Product';
import { FilterSection } from './Filter/FilterSection';
import { SortSection } from './Sort/SortSection';

export const Store = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const items = useSelector((state) => state.item.items);
  console.log(items)
  const loading = useSelector((state) => state.item.loading);

  return (
    <div className='grid grid-cols-5'>
      <div className='border'>
        <FilterSection/>
      </div>
      <div className='col-span-4 border'>
        <div>
          <SortSection/>
        </div>
        <div className='bg-white'>
                <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-5 lg:max-w-7xl lg:px-8">
                  <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {loading ? (
                      <p>Loading...</p>
                      ) : (
                      items?.map((product) => (
                      <Product
                        key={product._id}
                        productId={product._id}
                        title={product.title}
                        price={product.price}
                        description = {product.description}
                        image={product.image}  // Replace 'image' with the actual property name in your data
                      />
                    ))
                  )}
                </div>
              </div>
        </div>
      </div>
    </div>
  );
};


