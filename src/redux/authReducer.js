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
        available_state: false,
        loggedIn: userToken? true: false,
        userToken,
        userInfo,
        registerUserState: false,
        forgotPasswordState: false,
        confirmMailState: false,
        setPasswordState: false,
        getAvailableState: false,
        resendConfirmMailState: false,
        updateTokenState: false,
        getTokenState: false,
        upgradePlanState: false,
        updateFullNameState: false,
        updateEmailState: false,
        updatePasswordState: false,
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
        resendConfirmMailRequest: state => {
            state.resendConfirmMailState = true;
        },
        resendConfirmMailSuccess : state => {
            state.resendConfirmMailState =  false;
        },
        resendConfirmMailFailed : state => {
            state.resendConfirmMailState =  false;
        },
        getAvailableRequest: state => {
            state.getAvailableState = true;
        },
        getAvailableSuccess : (state, action) => {
            state.getAvailableState =  false;
            state.available_state = action.payload.possible
        },
        getAvailableFailed : state => {
            state.getAvailableState =  false;
        },
        updateTokenRequest: state => {
            state.updateTokenState = true;
        },
        updateTokenSuccess : (state, action) => {
            state.updateTokenState =  false;
            state.userToken = action.payload;
            state.userInfo = jwt_decode(action.payload);
        },
        updateTokenFailed : state => {
            state.updateTokenState =  false;
        },
        getTokenRequest: state => {
            state.getTokenState = true;
        },
        getTokenSuccess : (state, action) => {
            state.getTokenState =  false;
            state.userToken = action.payload.api_token;
            state.userInfo = jwt_decode(action.payload.api_token);
        },
        getTokenFailed : state => {
            state.updateTokenState =  false;
        },
        upgradePlanRequest: state => {
            state.upgradePlanState = true;
        },
        upgradePlanSuccess : (state, action) => {
            state.upgradePlanState =  false;
            state.userToken = action.payload.api_token;
            state.userInfo = jwt_decode(action.payload.api_token);
        },
        upgradePlanFailed : state => {
            state.upgradePlanState =  false;
        },
        updateFullNameRequest: state => {
            state.updateFullNameState = true;
        },
        updateFullNameSuccess : (state, action) => {
            state.updateFullNameState =  false;
            state.userToken = action.payload.api_token;
            state.userInfo = jwt_decode(action.payload.api_token);
        },
        updateFullNameFailed : state => {
            state.updateFullNameState =  false;
        },
        updateEmailRequest: state => {
            state.updateEmailState = true;
        },
        updateEmailSuccess : (state, action) => {
            state.updateEmailState =  false;
            state.userToken = action.payload.api_token;
            state.userInfo = jwt_decode(action.payload.api_token);
        },
        updateEmailFailed : state => {
            state.updateEmailState =  false;
        },
        updatePasswordRequest: state => {
            state.updatePasswordState = true;
        },
        updatePasswordSuccess : (state, action) => {
            state.updatePasswordState =  false;
            // state.userToken = action.payload.api_token;
            // state.userInfo = jwt_decode(action.payload.api_token);
        },
        updatePasswordFailed : state => {
            state.updatePasswordState =  false;
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
    getAvailableFailed, getAvailableRequest, getAvailableSuccess,
    resendConfirmMailFailed, resendConfirmMailRequest, resendConfirmMailSuccess,
    updateTokenFailed, updateTokenRequest, updateTokenSuccess,
    getTokenFailed, getTokenRequest, getTokenSuccess,
    upgradePlanFailed, upgradePlanRequest, upgradePlanSuccess,
    updateEmailFailed, updateEmailRequest, updateEmailSuccess,
    updateFullNameFailed, updateFullNameRequest, updateFullNameSuccess,
    updatePasswordFailed, updatePasswordRequest, updatePasswordSuccess,
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

export const resendConfirmMail = (user) => async (dispatch) => {
    dispatch(resendConfirmMailRequest());

    try {
        var payload = await userService.resendConfirmMail(user);
        dispatch(resendConfirmMailSuccess(payload));
        return {status: true, result: payload};
    } catch (error) {
        dispatch(resendConfirmMailFailed());
        // dispatch(openSnackBar({ message: error["message"], status: 'error' }));
        // throw new Error(error);
        return {status: false, result: error["message"]};
    }
}

export const getAvailable = (user) => async (dispatch) => {
    dispatch(getAvailableRequest());

    try {
        var payload = await userService.getAvailable(user);
        dispatch(getAvailableSuccess(payload));
        return {status: true, result: payload};
    } catch (error) {
        dispatch(getAvailableFailed());
        // dispatch(openSnackBar({ message: error["message"], status: 'error' }));
        // throw new Error(error);
        return {status: false, result: error["message"]};
    }
}

export const updateToken = (token) => async (dispatch) => {
    dispatch(updateTokenRequest());

    try {
        dispatch(updateTokenSuccess(token));
    } catch (error) {
        dispatch(updateTokenFailed());
        // dispatch(openSnackBar({ message: error["message"], status: 'error' }));
        // throw new Error(error);
        return {status: false, result: error["message"]};
    }
}

export const getToken = (token) => async (dispatch) => {
    dispatch(getTokenRequest());

    try {
        var payload = await userService.getToken(token);
        dispatch(getTokenSuccess(payload));
        return { status: true, result: payload }
    } catch (error) {
        dispatch(getTokenFailed());
        // dispatch(openSnackBar({ message: error["message"], status: 'error' }));
        // throw new Error(error);
        return {status: false, result: error["message"]};
    }
}

export const upgradePlan = (token) => async (dispatch) => {
    dispatch(upgradePlanRequest());

    try {
        var payload = await userService.upgradePlan(token);
        dispatch(upgradePlanSuccess(payload));
        return { status: true, result: payload }
    } catch (error) {
        dispatch(upgradePlanFailed());
        // dispatch(openSnackBar({ message: error["message"], status: 'error' }));
        // throw new Error(error);
        return {status: false, result: error["message"]};
    }
}

export const updateFullName = (user) => async (dispatch) => {
    dispatch(updateFullNameRequest());

    try {
        var payload = await userService.updateFullName(user);
        dispatch(updateFullNameSuccess(payload));
        return { status: true, result: payload }
    } catch (error) {
        dispatch(updateFullNameFailed());
        // dispatch(openSnackBar({ message: error["message"], status: 'error' }));
        // throw new Error(error);
        return {status: false, result: error["message"]};
    }
}

export const updateEmail = (user) => async (dispatch) => {
    dispatch(updateEmailRequest());

    try {
        var payload = await userService.updateEmail(user);
        dispatch(updateEmailSuccess(payload));
        return { status: true, result: payload }
    } catch (error) {
        dispatch(updateEmailFailed());
        // dispatch(openSnackBar({ message: error["message"], status: 'error' }));
        // throw new Error(error);
        return {status: false, result: error["message"]};
    }
}

export const updatePassword = (user) => async (dispatch) => {
    dispatch(updatePasswordRequest());

    try {
        var payload = await userService.updatePassword(user);
        dispatch(updatePasswordSuccess(payload));
        return { status: true, result: payload }
    } catch (error) {
        dispatch(updatePasswordFailed());
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
        // console.log(error);
        dispatch(openSnackBar({ message: error["message"], status: 'error' }));
        throw new Error(error);
    }
}

export default authSlice.reducer;