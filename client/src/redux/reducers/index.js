import { combineReducers } from "@reduxjs/toolkit";
import itemSlice from "./itemSlice";
import authSlice from "./authSlice";
import cartSlice from "./cartSlice";
import orderSlice from "./orderSlice";
import errorSlice from "./errorSlice";

export default combineReducers({
    item: itemSlice,
    auth: authSlice,
    cart: cartSlice,
    order: orderSlice,
    error: errorSlice
})