//cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    loading: false
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers : {
        getCart: (state, action) => {
            console.log(action.payload);
            state.cartItems = action.payload
            state.loading = false
        },
        addToCart : (state, action) => {
            state.cartItems = action.payload
        },
        deleteFromCart: (state, action) => {
            console.log(action.payload);
            state.cartItems = state.cartItems.items.filter(item => item._id!==action.payload)
        },
        cartLoading: (state) => {
            state.loading = true
        }
    }
})

export const { getCart, addToCart, deleteFromCart, cartLoading } = cartSlice.actions

export default cartSlice.reducer


// const items = [
//     {
//         image: "kfjkefijeihiehgieh.png",
//         name: "Women Floral Print Straight Kurta",
//         price: 499,
//         productId: "6589abdb2f79427c10f08e0b",
//         quantity: 1,
//         _id: "65b7cf0e0b6eba550c536c94"
//     }
//     {
//         image: "kfjkefijeihiehgieh.png",
//         name: "Round-Neck Top with Petal-Sleeves",
//         price: 999,
//         productId: "65a7b7ea36b57567602f7aae",
//         quantity: 1,
//         _id: "65b96b948fc6374f4064ca82"
//     }
// ]