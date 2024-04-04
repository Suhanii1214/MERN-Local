import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems, removeItem } from '../../redux/actions/itemActions';

export const DeleteItem = () => {
    const dispatch = useDispatch();
    const [selectedItemId, setSelectedItemId] = useState(null);
  
    useEffect(() => {
      dispatch(fetchItems());
    }, [dispatch]);
  
    const items = useSelector((state) => state.item.items);
    const loading = useSelector((state) => state.item.loading);
  
    const handleDeleteItem = () => {
      if (selectedItemId) {
        dispatch(removeItem(selectedItemId));
        setSelectedItemId(null);
      }
    };
  
    return (
      <div>
        <h1>All Items</h1>
        {loading ? <p>Loading...</p> : null}
        <ul>
          {items.map((item) => (
            <li key={item._id}>
              <span>{item.title}</span>
              <button onClick={() => setSelectedItemId(item._id)}>Select</button>
            </li>
          ))}
        </ul>
        <div>
          <h2>Selected Item</h2>
          {selectedItemId ? (
            <div>
              <p>{items.find((item) => item._id === selectedItemId)?.title}</p>
              <button onClick={handleDeleteItem}>Delete</button>
            </div>
          ) : (
            <p>No item selected</p>
          )}
        </div>
      </div>
    );
}
