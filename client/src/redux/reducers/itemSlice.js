//itemSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    originalItems: [],
    wishlistItems: [],
    selectedCategories: [],
    selectedPrices: [],
    loading: false
}

const itemSlice = createSlice({
    name: 'item',
    initialState,
    reducers: {
        getItems: (state, action) => {
            state.items = action.payload
            state.loading = false
        },
        addItem: (state, action) => {
            state.items = [action.payload, ...state.items]
        },
        deleteItem: (state, action) => {
            state.items = state.items.filter(item => item._id!==action.payload)
        },
        updateItem: (state, action) => {
            const {id, data} = action.payload
            state.items = state.items.map(item => item._id === id ? { ...item, ...data } : item)
        },
        itemsLoading: (state) => {
            state.loading = true
        },
        categoryFilter: (state, action) => {
            const selectedCategory = action.payload

            if (state.originalItems.length === 0) {
                state.originalItems =[...state.items];
            }
            console.log(state.originalItems);
            // Toggle the selected category in the array
            state.selectedCategories.includes(selectedCategory)
            ? state.selectedCategories = state.selectedCategories.filter(category => category !== selectedCategory)
            : state.selectedCategories = [...state.selectedCategories, selectedCategory];

            // If there are selected categories, filter items based on them, else show all items
            state.items = state.selectedCategories.length > 0
            ? state.originalItems.filter(item => state.selectedCategories.includes(item.category))
            : state.originalItems;
        },
        priceFilter: (state, action) => {
            const selectedPrice = action.payload;

            if (state.originalItems.length === 0) {
                state.originalItems =[...state.items];
            }
            console.log(state.originalItems);

            // If a price filter is already applied, clear it
            if (state.selectedPrices.length > 0) {
                state.items = state.originalItems;
                state.selectedPrices = [];
            }

            // Toggle the selected price in the array
            state.selectedPrices = [selectedPrice];

            // If there are selected prices, filter items based on them, else show all items
            state.items = state.selectedPrices.length > 0
                ? state.originalItems.filter(item => {
                    // Customize this condition based on your item price structure
                    if (selectedPrice === 'Below Rs.499') {
                        return item.price < 499;
                    } else if (selectedPrice === 'Rs.499 - Rs.1,999') {
                        return item.price >= 499 && item.price <= 1999;
                    } else if (selectedPrice === 'Rs.1,999 - Rs.4,999') {
                        return item.price >= 1999 && item.price <= 4999;
                    } else if (selectedPrice === 'Rs.4,999 - Rs.9,999') {
                        return item.price >= 4999 && item.price <= 9999;
                    } else if (selectedPrice === 'Rs.9,999 - Rs.14,999') {
                        return item.price >= 9999 && item.price <= 14999;
                    } else if (selectedPrice === 'Above Rs.14,999') {
                        return item.price > 14999
                    }

                    return true; // If no condition matches, include the item
                })
                : state.originalItems;
        },
        sortItems: (state, action) => {
            const selectedSort = action.payload;
            switch (selectedSort) {
                case 'Most Popular':
                    // Implement sorting logic for Most Popular
                    break;
                case 'New Arrivals':
                    // Implement sorting logic for New Arrivals
                    state.items.sort((a, b) => new Date(a.date) - new Date(b.date));                    
                    break;
                case 'Price: Low to High':
                    // Implement sorting logic for Price: Low to High
                    state.items.sort((a, b) => b.price - a.price);
                    break;
                case 'Price: High to Low':
                    // Implement sorting logic for Price: High to Low
                    state.items.sort((a, b) => a.price - b.price);
                    break;
                default:
                    // Default case or no sorting logic needed
                    break;
            }
        },
        addToWishlist: (state, action) => {
            const newItem = action.payload;
            state.wishlistItems = [newItem, ...state.wishlistItems];
            console.log(state.wishlistItems);
        },
        removeFromWishlist: (state, action) => {
            const itemIdToRemove = action.payload;
            state.wishlistItems = state.wishlistItems.filter(
              (item) => item._id !== itemIdToRemove
            );
            console.log(state.wishlistItems);
        },
    }
})

export const { getItems, addItem, deleteItem, updateItem, itemsLoading, categoryFilter, priceFilter, sortItems, addToWishlist, removeFromWishlist} = itemSlice.actions

export default itemSlice.reducer