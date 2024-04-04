//itemActions.js
import axios from 'axios';
import { getItems, addItem, deleteItem, updateItem, itemsLoading } from '../reducers/itemSlice';
import { returnErrors } from './errorActions';

export const fetchItems = () => (dispatch) => {
    dispatch(itemsLoading());
    axios.get('/api/items')
        .then(res => {
            // console.log(res.data);
            dispatch(getItems(res.data))
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// export const fetchItemById = (id) => (dispatch) => {
//     dispatch(itemsLoading())
//     axios.get(`/api/item/${id}`)
//     .then(res => {
//         console.log(res.data);
//         dispatch(getItems(res.data))
//     })
//     .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
// }

export const createItem = (item) => (dispatch) => {
    console.log(item);
    axios.post('/api/add-item', item)
        .then(res => {
            dispatch(addItem(item))
            console.log("Item Added Successfully");
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const removeItem = (id) => (dispatch) => {
    axios.delete(`/api/items/${id}`)
        .then(() => dispatch(deleteItem(id)))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const modifyItem = (id, item) => (dispatch) => {
    axios.put(`/api/items/${id}`, item)
        .then(res => dispatch(updateItem({ id, data: res.data })))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}
