import  { authHeader, handleResponse } from '../utils';
import { API_BASE } from '../config/constants';

const generateYoutubeDescription = async (data) => {
    const requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
        },
        body: JSON.stringify(data)
    };

    const response = fetch(`${API_BASE}/template/youtube/generate_description`, requestOptions);
    return await handleResponse(response);
}

export const youtubeService = {
    generateYoutubeDescription,
}