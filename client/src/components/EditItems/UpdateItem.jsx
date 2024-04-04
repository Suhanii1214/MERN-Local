import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems, modifyItem } from '../../redux/actions/itemActions';

export const UpdateItem = () => {
    const dispatch = useDispatch();
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [updatedItem, setUpdatedItem] = useState({
      title: '',
      price: 0,
      category: '',
      description: '',
    });
  
    useEffect(() => {
      dispatch(fetchItems());
    }, [dispatch]);
  
    const items = useSelector((state) => state.item.items);
    const loading = useSelector((state) => state.item.loading);
  
    const handleSelectItem = (itemId) => {
      setSelectedItemId(itemId);
      const selectedItem = items.find((item) => item._id === itemId);
      setUpdatedItem({
        title: selectedItem.title,
        price: selectedItem.price,
        category: selectedItem.category,
        description: selectedItem.description,
      });
    };
  
    const handleUpdateItem = () => {
      if (selectedItemId) {
        dispatch(modifyItem(selectedItemId, updatedItem));
        setSelectedItemId(null);
        setUpdatedItem({
          title: '',
          price: 0,
          category: '',
          description: '',
        });
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
              <button onClick={() => handleSelectItem(item._id)}>Select</button>
            </li>
          ))}
        </ul>
        <div>
          <h2>Update Item</h2>
          {selectedItemId ? (
            <div>
              <label>Title:</label>
              <input
                type="text"
                value={updatedItem.title}
                onChange={(e) =>
                  setUpdatedItem({ ...updatedItem, title: e.target.value })
                }
              />
              <label>Price:</label>
              <input
                type="number"
                value={updatedItem.price}
                onChange={(e) =>
                  setUpdatedItem({ ...updatedItem, price: e.target.value })
                }
              />
              <label>Category:</label>
              <input
                type="text"
                value={updatedItem.category}
                onChange={(e) =>
                  setUpdatedItem({ ...updatedItem, category: e.target.value })
                }
              />
              <label>Description:</label>
              <textarea
                value={updatedItem.description}
                onChange={(e) =>
                  setUpdatedItem({ ...updatedItem, description: e.target.value })
                }
              />
              <button onClick={handleUpdateItem}>Update</button>
            </div>
          ) : (
            <p>No item selected</p>
          )}
        </div>
      </div>
    )
}
