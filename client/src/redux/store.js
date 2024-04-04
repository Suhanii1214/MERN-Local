import {configureStore, applyMiddleware} from '@reduxjs/toolkit'
import rootReducer from '../redux/reducers/index'

export const store = configureStore({
    reducer: rootReducer
})