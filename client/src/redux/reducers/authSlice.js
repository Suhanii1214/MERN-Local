//authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: false,
    user: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userLoading: (state) => {
            state.isLoading = true;
        },
        userLoaded: (state, action) => {
            state.isAuthenticated = true;
            state.isLoading = false;
            state.user = action.payload;
        },
        loginSuccess: (state, action) => {
            localStorage.setItem('token', action.payload.token);
            state.isAuthenticated = true;
            state.isLoading = false;
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        authError: (state) => {
            localStorage.removeItem('token');
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            state.isLoading = false;
        },
        logoutSuccess: (state) => {
            localStorage.removeItem('token');
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            state.isLoading = false;
        },
        registerFail: (state) => {
            localStorage.removeItem('token');
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            state.isLoading = false;
        },
        updateUserInfoSuccess: (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
        },
          updateUserInfoFail: (state) => {
            state.isLoading = false;
        },
    },
});

export const { userLoading, userLoaded, loginSuccess, authError, logoutSuccess, registerFail, updateUserInfoSuccess,  updateUserInfoFail} = authSlice.actions;

export default authSlice.reducer;
