//orderSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orders: [],
    loading: false
}

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        getOrders: (state, action) => {
            console.log(action);
            state.orders = action.payload
            console.log(state.orders);
            state.loading = false
        },
        checkout: (state, action) => {
            state.orders = [action.payload, ...state.orders]
        },
        ordersLoading: (state) => {
            state.loading = true
        }
    }
})

export const { getOrders, checkout, ordersLoading } = orderSlice.actions

export default orderSlice.reducer