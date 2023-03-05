import  { authHeader, handleResponse } from '../utils';
import { GPT_SERVER } from '../config/constants';

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

    const response = fetch(`${GPT_SERVER}/template/social/pinterest_generate_title_description`, requestOptions);
    return await handleResponse(response);
}

const generatePhotoPostCaption = async (data) => {
    const requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
        },
        body: JSON.stringify(data)
    };

    const response = fetch(`${GPT_SERVER}/template/social/photo_post_caption`, requestOptions);
    return await handleResponse(response);
}

const generateOpinionPieceColumn = async (data) => {
    const requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
        },
        body: JSON.stringify(data)
    };

    const response = fetch(`${GPT_SERVER}/template/social/generate_opinion_piece_column`, requestOptions);
    return await handleResponse(response);
}

const generateGoogleBusinessPost = async (data) => {
    const requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
        },
        body: JSON.stringify(data)
    };

    const response = fetch(`${GPT_SERVER}/template/social/google_business_post`, requestOptions);
    return await handleResponse(response);
}

export const socialService = {
    generatePinterestTitleDescription,
    generatePhotoPostCaption,
    generateOpinionPieceColumn,
    generateGoogleBusinessPost
}