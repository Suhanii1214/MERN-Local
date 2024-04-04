//authActions.js
import axios from 'axios';
import { returnErrors } from './errorActions';
import { userLoading, userLoaded, authError, loginSuccess, registerFail, logoutSuccess } from '../reducers/authSlice';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router';

export const loadUser = () => (dispatch, getState) => {
    dispatch(userLoading());

    axios
        .get('/api/user', tokenConfig(getState))
        .then((res) => dispatch(userLoaded(res.data)))
        .catch((err) => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch(authError());
        });
};

export const register = ({ name, email, password }) => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const body = JSON.stringify({ name, email, password });

    axios
        .post('/api/signup', body, config)
        .then((res) => {
            dispatch(loginSuccess(res.data))
            toast.success("Sign Up Successful")
            console.log("Register Successful");
            
        })
        .catch((err) => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
            dispatch(registerFail());
            toast.error("Please try again")
        });
};

export const login = ({ email, password }) => (dispatch) => {
    const config = {
        headers: {
            'Content-type': 'application/json',
        },
    };

    const body = JSON.stringify({ email, password });

    axios
        .post('/api/login', body, config)
        .then((res) => {
            dispatch(loginSuccess(res.data))
            toast.success("Login Successful")
            console.log("Login Successful");
        })
        .catch((err) => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
            dispatch(registerFail());
            toast.error("Incorrect Email or Password")
            console.log("Error in Login");
        });
};

export const logout = () => {
    return {
        type: logoutSuccess.type,
    };
};

export const updateUserInfo = (updatedData) => (dispatch, getState) => {

    const tokenConfig = (getState) => {
        const token = getState().auth.token;
    
        const config = {
          headers: {
            'Content-type': 'application/json',
          },
        };
    
        if (token) {
          config.headers['x-auth-token'] = token;
        }
    
        return config;
      };

    axios
    .put('/api/update-user', updatedData, tokenConfig(getState))
    .then((res) => {
      dispatch(userLoaded(res.data));
      toast.success("User information updated successfully");
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch(authError());
      toast.error("Failed to update user information. Please try again.");
    });
};


export const tokenConfig = (getState) => {
    const token = getState().auth.token;

    const config = {
        headers: {
            'Content-type': 'application/json',
        },
    };

    if (token) {
        config.headers['x-auth-token'] = token;
    }

    return config;
};
