//cartActions.js
import axios from "axios";
import { returnErrors } from "./errorActions";
import { getCart, addToCart, deleteFromCart, cartLoading } from "../reducers/cartSlice";

export const fetchCart = (id) => (dispatch) => {
    dispatch(cartLoading());
    axios.get(`/api/fetchCart/${id}`)
        .then(res => {
            dispatch(getCart(res.data))
            console.log(res.data);
            console.log("Cart Fetched");
        })
        .catch(err => {
            console.log(err);
            dispatch(returnErrors(err.message, err.response.status))
        })
}

export const addItemToCart = (id, productId, quantity) => dispatch => {
    axios.post(`/api/cart/${id}`, { productId, quantity })
        .then(res => {
            dispatch(addToCart(res.data))
            console.log(res.data.items);
            console.log("Items Added Successfully");
        })
        .catch(err => {
            console.log(err);
            dispatch(returnErrors(err.res.data, err.res.status))
        })
}

export const removeItemFromCart = (userId, itemId) => dispatch => {
    axios.delete(`/api/cart/${userId}/${itemId}`)
        .then(res => dispatch(deleteFromCart(itemId)))
        .catch(err => {
            console.log(err);
            dispatch(returnErrors(err.res.data, err.res.status))
        })
}
