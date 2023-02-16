import  { authHeader, handleResponse } from '../utils';
import { API_BASE } from '../config/constants';

const generateOutline = async (data) => {
    const requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
        },
        body: JSON.stringify(data)
    };

    const response = fetch(`${API_BASE}/template/blog/generate_outline`, requestOptions);
    return await handleResponse(response);
}

const generateOneOutline = async (data) => {
    const requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
        },
        body: JSON.stringify(data)
    };

    const response = fetch(`${API_BASE}/template/blog/generate_one_outline`, requestOptions);
    return await handleResponse(response);
}

const generateLongArticle = async (data) => {
    const requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
        },
        body: JSON.stringify(data)
    };

    const response = fetch(`${API_BASE}/template/blog/generate_long_article`, requestOptions);
    return await handleResponse(response);
}

export const blogService = {
    generateOutline,
    generateOneOutline,
    generateLongArticle
}