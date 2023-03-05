import  { authHeader, handleResponse } from '../utils';
import { GPT_SERVER } from '../config/constants';

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

    const response = fetch(`${GPT_SERVER}/template/youtube/generate_description`, requestOptions);
    return await handleResponse(response);
}

const generateYoutubeHookIntroduction = async (data) => {
    const requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
        },
        body: JSON.stringify(data)
    };

    const response = fetch(`${GPT_SERVER}/template/youtube/generate_introduction`, requestOptions);
    return await handleResponse(response);
}

const generateYoutubeTitle = async (data) => {
    const requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
        },
        body: JSON.stringify(data)
    };

    const response = fetch(`${GPT_SERVER}/template/youtube/generate_title`, requestOptions);
    return await handleResponse(response);
}

export const youtubeService = {
    generateYoutubeDescription,
    generateYoutubeHookIntroduction,
    generateYoutubeTitle
}