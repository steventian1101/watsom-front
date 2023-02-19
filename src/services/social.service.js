import  { authHeader, handleResponse } from '../utils';
import { API_BASE } from '../config/constants';

const generatePinterestTitleDescription = async (data) => {
    const requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
        },
        body: JSON.stringify(data)
    };

    const response = fetch(`${API_BASE}/template/social/generate_title_description`, requestOptions);
    return await handleResponse(response);
}

export const socialService = {
    generatePinterestTitleDescription,
}