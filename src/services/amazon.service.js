import  { authHeader, handleResponse } from '../utils';
import { API_BASE } from '../config/constants';

const generateAmazonProductFeature = async (data) => {
    const requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
        },
        body: JSON.stringify(data)
    };

    const response = fetch(`${API_BASE}/template/amazon/generate_product_feature`, requestOptions);
    return await handleResponse(response);
}

const generateAmazonProductTitle = async (data) => {
    const requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
        },
        body: JSON.stringify(data)
    };

    const response = fetch(`${API_BASE}/template/amazon/generate_product_title`, requestOptions);
    return await handleResponse(response);
}

export const amazonService = {
    generateAmazonProductFeature,
    generateAmazonProductTitle
}