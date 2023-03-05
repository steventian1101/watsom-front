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
        forgotPasswordState: false
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