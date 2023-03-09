import  { authHeader, handleResponse } from '../utils';
import { API_BASE } from '../config/constants';

const login = async (user) => {
    const requestOptions = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    const response = await fetch(`${API_BASE}/auth/login`, requestOptions);
    const userInfo = await handleResponse(response);
    localStorage.setItem('user', JSON.stringify(userInfo.api_token));
    return userInfo;
}

const logout = () => {
    localStorage.removeItem('user');
}

const registerUser = async (user) => {
    const requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
        },
        body: JSON.stringify(user)
    };

    const response = fetch(`${API_BASE}/auth/register`, requestOptions);
    return await handleResponse(response);
}

const confirmMail = async (token) => {
    const requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
        },
        body: JSON.stringify({token})
    };

    const response = fetch(`${API_BASE}/auth/confirm`, requestOptions);
    const userInfo = await handleResponse(response);
    localStorage.setItem('user', JSON.stringify(userInfo.api_token));
    return userInfo;
}

const setPassword = async (user) => {
    const requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
        },
        body: JSON.stringify(user)
    };

    const response = fetch(`${API_BASE}/auth/set_password`, requestOptions);
    return await handleResponse(response);
}

const forgotPassword = async (user) => {
    const requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
        },
        body: JSON.stringify(user)
    };

    const response = fetch(`${API_BASE}/auth/forgot_password`, requestOptions);
    return await handleResponse(response);
}

const resendConfirmMail = async (user) => {
    const requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
        },
        body: JSON.stringify(user)
    };

    const response = fetch(`${API_BASE}/auth/resend_confirm_mail`, requestOptions);
    return await handleResponse(response);
}

const getAvailable = async (user) => {
    const requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
        },
        body: JSON.stringify(user)
    };

    const response = fetch(`${API_BASE}/auth/get_available`, requestOptions);
    return await handleResponse(response);
}

const getToken = async (token) => {
    const requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
        },
        body: JSON.stringify({token})
    };

    const response = fetch(`${API_BASE}/auth/get_token`, requestOptions);
    return await handleResponse(response);
}

const upgradePlan = async (token) => {
    const requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
        },
        body: JSON.stringify({token})
    };

    const response = fetch(`${API_BASE}/auth/upgrade_plan`, requestOptions);
    return await handleResponse(response);
}

export const userService = {
    login,
    logout,
    registerUser,
    forgotPassword,
    confirmMail,
    setPassword,
    getAvailable,
    resendConfirmMail,
    getToken,
    upgradePlan
}