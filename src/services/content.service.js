import  { authHeader, handleResponse } from '../utils';
import { API_BASE } from '../config/constants';

const contentImprover = async (data) => {
    const requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
        },
        body: JSON.stringify(data)
    };

    const response = fetch(`https://app.flowmind.ai/api/template`, requestOptions);
    return await handleResponse(response);
}

export const contentService = {
    contentImprover
}