import { createSlice } from "@reduxjs/toolkit";
import { userService } from '../services/users.service'
import { openSnackBar } from "./snackBarReducer";
import jwt_decode from "jwt-decode";

let userToken = localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')) : null;
let userInfo = userToken ? jwt_decode(userToken) : {};

export const authSlice = createSlice({
    name: "authentication",
    initialState:{
        loggingIn: false,
        loggedIn: userToken? true: false,
        userToken,
        userInfo,
        registerUserState: false,
        forgotPasswordState: false,
        confirmMailState: false,
        setPasswordState: false
    },
    reducers:{
        loginRequest: state => {
            state.loggingIn = true
        },
        loginSuccess: (state, action) => {
            state.loggingIn = false;
            state.loggedIn = true;
            state.userToken = action.payload.api_token;
            state.userInfo = jwt_decode(action.payload.api_token);
        },
        loginFailed : state => {
            state.loggingIn = false;
            state.loggedIn = false
        },
        registerUserRequest: state => {
            state.registerUserState = true;
        },
        registerUserSuccess : state => {
            state.registerUserState =  false;
        },
        registerUserFailed : state => {
            state.registerUserState =  false;
        },
        confirmMailRequest: state => {
            state.confirmMailState = true;
        },
        confirmMailSuccess : (state, action) => {
            state.confirmMailState =  false;
            state.loggedIn = true;
            state.userToken = action.payload.api_token;
            state.userInfo = jwt_decode(action.payload.api_token);
        },
        confirmMailFailed : state => {
            state.confirmMailState =  false;
            state.loggedIn = false;
        },
        setPasswordRequest: state => {
            state.setPasswordState = true;
        },
        setPasswordSuccess : state => {
            state.setPasswordState =  false;
        },
        setPasswordFailed : state => {
            state.setPasswordState =  false;
        },
        forgotPasswordRequest: state => {
            state.forgotPasswordState = true;
        },
        forgotPasswordSuccess : state => {
            state.forgotPasswordState =  false;
        },
        forgotPasswordFailed : state => {
            state.forgotPasswordState =  false;
        },
        logoutRequest: state => {
            localStorage.removeItem('user');
            state.loggedIn = false;
            state.userToken = null;
            state.userInfo = null;
        }
    }
});

const {  
    loginRequest, loginSuccess, loginFailed, 
    registerUserRequest, registerUserFailed, registerUserSuccess,
    forgotPasswordFailed, forgotPasswordRequest, forgotPasswordSuccess,
    confirmMailFailed, confirmMailRequest, confirmMailSuccess,
    setPasswordFailed, setPasswordRequest,setPasswordSuccess,
    logoutRequest
} = authSlice.actions;

export const login = (user) => async (dispatch) => {

    dispatch(loginRequest());

    try {
        var payload = await userService.login(user);
        dispatch(loginSuccess(payload));
        return {status: true, result: payload};
    } catch (error) {
        dispatch(loginFailed());
        // dispatch(openSnackBar({ message: error["message"], status: 'error' }));
        // throw new Error(error);
        return {status: false, result: error["message"]};
    }
}

export const registerUser = (user) => async (dispatch) => {
    dispatch(registerUserRequest());

    try {
        var payload = await userService.registerUser(user);
        dispatch(registerUserSuccess(payload));
        return {status: true, result: payload};
    } catch (error) {
        dispatch(registerUserFailed());
        // dispatch(openSnackBar({ message: error["message"], status: 'error' }));
        // throw new Error(error);
        return {status: false, result: error["message"]};
    }
}

export const confirmMail = (token) => async (dispatch) => {
    dispatch(confirmMailRequest());

    try {
        var payload = await userService.confirmMail(token);
        dispatch(confirmMailSuccess(payload));
        return {status: true, result: payload};
    } catch (error) {
        dispatch(confirmMailFailed());
        dispatch(openSnackBar({ message: error["message"], status: 'error' }));
        // throw new Error(error);
        return {status: false, result: error["message"]};
    }
}

export const setPassword = (user) => async (dispatch) => {
    dispatch(setPasswordRequest());

    try {
        var payload = await userService.setPassword(user);
        dispatch(setPasswordSuccess(payload));
        return {status: true, result: payload};
    } catch (error) {
        dispatch(setPasswordFailed());
        dispatch(openSnackBar({ message: error["message"], status: 'error' }));
        // throw new Error(error);
        return {status: false, result: error["message"]};
    }
}

export const forgotPassword = (user) => async (dispatch) => {
    dispatch(forgotPasswordRequest());

    try {
        var payload = await userService.forgotPassword(user);
        dispatch(forgotPasswordSuccess(payload));
        return {status: true, result: payload};
    } catch (error) {
        dispatch(forgotPasswordFailed());
        // dispatch(openSnackBar({ message: error["message"], status: 'error' }));
        // throw new Error(error);
        return {status: false, result: error["message"]};
    }
}

export const logout = () => async (dispatch) => {
    dispatch(logoutRequest());

    try {
        await userService.logout();
    } catch (error) {
        console.log(error);
        dispatch(openSnackBar({ message: error["message"], status: 'error' }));
        throw new Error(error);
    }
}

export default authSlice.reducer;