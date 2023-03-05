import  { authHeader, handleResponse } from '../utils';
import { GPT_SERVER } from '../config/constants';

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

    const response = fetch(`${GPT_SERVER}/template/blog/generate_outline`, requestOptions);
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

    const response = fetch(`${GPT_SERVER}/template/blog/generate_one_outline`, requestOptions);
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

    const response = fetch(`${GPT_SERVER}/template/blog/generate_long_article`, requestOptions);
    return await handleResponse(response);
}

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

    const response = fetch(`${GPT_SERVER}/template/blog/content_improver`, requestOptions);
    return await handleResponse(response);
}

const generateBlogIdeaOutline = async (data) => {
    const requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
        },
        body: JSON.stringify(data)
    };

    const response = fetch(`${GPT_SERVER}/template/blog/idea_outline`, requestOptions);
    return await handleResponse(response);
}

const generateBlogIntroParagraph = async (data) => {
    const requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
        },
        body: JSON.stringify(data)
    };

    const response = fetch(`${GPT_SERVER}/template/blog/intro_paragraph`, requestOptions);
    return await handleResponse(response);
}

const generateBlogSeoTitleMetaDescription = async (data) => {
    const requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
        },
        body: JSON.stringify(data)
    };

    const response = fetch(`${GPT_SERVER}/template/blog/generate_blog_seo_title_meta_desciption`, requestOptions);
    return await handleResponse(response);
}

const paraphrasingRewriteQuillbot = async (data) => {
    const requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
        },
        body: JSON.stringify(data)
    };

    const response = fetch(`${GPT_SERVER}/template/blog/paraphrasing_rewrite_quillbot`, requestOptions);
    return await handleResponse(response);
}

const generateInterviewQuestion = async (data) => {
    const requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
        },
        body: JSON.stringify(data)
    };

    const response = fetch(`${GPT_SERVER}/template/blog/generate_interview_question`, requestOptions);
    return await handleResponse(response);
}

export const blogService = {
    generateOutline,
    generateOneOutline,
    generateLongArticle,
    contentImprover,
    generateBlogIdeaOutline,
    generateBlogIntroParagraph,
    generateBlogSeoTitleMetaDescription,
    paraphrasingRewriteQuillbot,
    generateInterviewQuestion
}