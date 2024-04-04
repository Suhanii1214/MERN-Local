import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createItem } from '../../redux/actions/itemActions'

export const AddItem = () => {
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        price: 0,
        discountedPrice: 0,
        category: '',
        description: '',
        image: ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
    
        reader.onloadend = () => {
          setFormData({
            ...formData,
            image: reader.result, // Convert image to a string and store it in formData
          });
        };
    
        if (file) {
          reader.readAsDataURL(file);
        }
      };    
    

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(formData);

        dispatch(createItem(formData))

        setFormData({
            title: '',
            company: '',
            price: 0,
            discountedPrice: 0,
            category: '',
            description: '',
            image: '',
        })
    }

  return <div>
    <h2>Add Item</h2>
    <form onSubmit={handleSubmit}>
        <div>
            <label>Title</label>
            <input
                type='text'
                name='title'
                value={formData.title}
                onChange={handleChange}
                placeholder='Enter Title'
                required
            />
        </div>
        <div>
            <label>Company</label>
            <input
                type='text'
                name='company'
                value={formData.company}
                onChange={handleChange}
                placeholder='Enter Company'
                required
            />
        </div>
        <div>
            <label>Price</label>
            <input
                type='number'
                name='price'
                value={formData.price}
                onChange={handleChange}
                placeholder='Enter Price'
                required
            />
        </div>
        <div>
            <label>Discounted Price - If Any</label>
            <input
                type='text'
                name='discountedPrice'
                value={formData.discountedPrice}
                onChange={handleChange}
                placeholder='Enter Discounted Price'
                required
            />
        </div>
        <div>
            <label>Category</label>
            <input
                type='text'
                name='category'
                value={formData.category}
                onChange={handleChange}
                placeholder='Enter Category'
                required
            />
        </div>
        <div>
            <label>Description</label>
            <textarea
                name='description'
                value={formData.description}
                onChange={handleChange}
                placeholder='Add a Description'
                required
            />
        </div>
        <div>
            <label>Add Image</label>
            <input type='file' accept='image/*' onChange={handleImageChange}/>
        </div>
        <button type='submit'>Add Item</button>
    </form>
  </div>
}
