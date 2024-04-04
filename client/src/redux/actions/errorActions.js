import { getErrors as getErrorsAction, clearErrors as clearErrorsAction } from "../reducers/errorSlice";

// Return Errors
export const returnErrors = (msg, status, id = null) => {
    return (dispatch) => {
        dispatch(getErrorsAction({ msg, status, id }));
    };
};

// Clear Errors
export const clearErrors = () => {
    return (dispatch) => {
        dispatch(clearErrorsAction());
    };
};
