import axios from 'axios';
import { returnErrors } from './errorActions';
import { getOrders, checkout, ordersLoading } from '../reducers/orderSlice';

export const fetchOrders = (id) => dispatch => {
    dispatch(ordersLoading());
    axios.get(`/api/order/${id}`)
        .then(res => {
            dispatch(getOrders(res.data))
            console.log(res.data);
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const initiateCheckout = (id, source) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.post(`/api/order/checkout/${id}`, { source })
        .then(res => {
            dispatch(checkout(res.data))
            console.log(res.data);
            console.log("Order Successful");
            resolve(res.data)
        })
        .catch(err => {
            dispatch(returnErrors("Error Occured: ", err.response.data, err.response.status))
            reject(err)
        });
    })
}
