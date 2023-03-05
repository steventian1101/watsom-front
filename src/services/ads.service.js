import  { authHeader, handleResponse } from '../utils';
import { GPT_SERVER } from '../config/constants';

const generateFacebookAds = async (data) => {
    const requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
        },
        body: JSON.stringify(data)
    };

    const response = fetch(`${GPT_SERVER}/template/ads/facebook_generate_ads`, requestOptions);
    return await handleResponse(response);
}

const generateGoogleAds = async (data) => {
    const requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
        },
        body: JSON.stringify(data)
    };

    const response = fetch(`${GPT_SERVER}/template/ads/google_generate_ads`, requestOptions);
    return await handleResponse(response);
}

export const adsService = {
    generateFacebookAds,
    generateGoogleAds
}