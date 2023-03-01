import { createSlice } from "@reduxjs/toolkit";
import { openSnackBar } from "../../snackBarReducer";

import { blogService } from '../../../services/blog.service'

export const blogSlice = createSlice({
    name: "blog",
    initialState: {
        generateOutlineState: false,
        generateOneOutlineState: false,
        generateLongArticle: false,
        outline: [],
        oneOutline: "",
        contentImproverState: false,
        paraphrasingRewriteQuillbotState: false,
        generateBlogIdeaOutlineState: false,
        generateBlogIntroParagraphState: false,
        generateBlogSeoTitleMetaDescriptionState: false,
        generateInterviewQuestionState: false
    },
    reducers: {
        generateOutlineRequest: state => {
            state.generateOutlineState = true
        },
        generateOutlineSuccess: (state, action) => {
            state.generateOutlineState = false;
            state.outline = action.payload.result;
        },
        generateOutlineFailed: (state, action) => {
            state.generateOutlineState = false;
        },
        generateOneOutlineRequest: state => {
            state.generateOneOutlineState = true
        },
        generateOneOutlineSuccess: (state, action) => {
            state.generateOneOutlineState = false;
            state.outline = action.payload.result;
        },
        generateOneOutlineFailed: (state, action) => {
            state.generateOneOutlineState = false;
        },
        generateLongArticleRequest: state => {
            state.generateLongArticleState = true
        },
        generateLongArticleSuccess: (state, action) => {
            state.generateLongArticleState = false;
        },
        generateLongArticleFailed: (state, action) => {
            state.generateLongArticleState = false;
        },
        contentImproverRequest: state => {
            state.contentImproverState = true
        },
        contentImproverSuccess: (state, action) => {
            state.contentImproverState = false;
            state.result = action.payload.result;
        },
        contentImproverFailed: (state, action) => {
            state.contentImproverState = false;
        },
        paraphrasingRewriteQuillbotRequest: state => {
            state.paraphrasingRewriteQuillbotState = true
        },
        paraphrasingRewriteQuillbotSuccess: (state, action) => {
            state.paraphrasingRewriteQuillbotState = false;
            state.result = action.payload.result;
        },
        paraphrasingRewriteQuillbotFailed: (state, action) => {
            state.paraphrasingRewriteQuillbotState = false;
        },
        generateBlogIdeaOutlineRequest: state => {
            state.generateBlogIdeaOutlineState = true
        },
        generateBlogIdeaOutlineSuccess: (state, action) => {
            state.generateBlogIdeaOutlineState = false;
            state.result = action.payload.result;
        },
        generateBlogIdeaOutlineFailed: (state, action) => {
            state.generateBlogIdeaOutlineState = false;
        },
        generateBlogIntroParagraphRequest: state => {
            state.generateBlogIntroParagraphState = true
        },
        generateBlogIntroParagraphSuccess: (state, action) => {
            state.generateBlogIntroParagraphState = false;
            state.result = action.payload.result;
        },
        generateBlogIntroParagraphFailed: (state, action) => {
            state.generateBlogIntroParagraphState = false;
        },
        generateBlogSeoTitleMetaDescriptionRequest: state => {
            state.generateBlogSeoTitleMetaDescriptionState = true
        },
        generateBlogSeoTitleMetaDescriptionSuccess: (state, action) => {
            state.generateBlogSeoTitleMetaDescriptionState = false;
        },
        generateBlogSeoTitleMetaDescriptionFailed: (state, action) => {
            state.generateBlogSeoTitleMetaDescriptionState = false;
        },
        generateInterviewQuestionRequest: state => {
            state.generateInterviewQuestionState = true
        },
        generateInterviewQuestionSuccess: (state, action) => {
            state.generateInterviewQuestionState = false;
        },
        generateInterviewQuestionFailed: (state, action) => {
            state.generateInterviewQuestionState = false;
        },
    }
});

const {
    generateOutlineFailed, generateOutlineRequest, generateOutlineSuccess,
    generateOneOutlineFailed, generateOneOutlineRequest, generateOneOutlineSuccess,
    generateLongArticleFailed, generateLongArticleRequest, generateLongArticleSuccess,
    contentImproverFailed, contentImproverRequest, contentImproverSuccess,
    generateBlogIdeaOutlineFailed, generateBlogIdeaOutlineRequest, generateBlogIdeaOutlineSuccess,
    generateBlogIntroParagraphFailed, generateBlogIntroParagraphRequest, generateBlogIntroParagraphSuccess,
    generateBlogSeoTitleMetaDescriptionFailed, generateBlogSeoTitleMetaDescriptionRequest, generateBlogSeoTitleMetaDescriptionSuccess,
    paraphrasingRewriteQuillbotFailed, paraphrasingRewriteQuillbotRequest, paraphrasingRewriteQuillbotSuccess,
    generateInterviewQuestionFailed, generateInterviewQuestionRequest, generateInterviewQuestionSuccess
} = blogSlice.actions;

export const generateOutline = (data) => async (dispatch) => {

    dispatch(generateOutlineRequest());

    try {
        var payload = await blogService.generateOutline(data);
        dispatch(generateOutlineSuccess(payload));
        return payload;
    } catch (error) {
        dispatch(generateOutlineFailed());
        dispatch(openSnackBar({ message: error["message"], status: 'error' }));
        // throw new Error(error);
        return false;
    }
}

export const generateOneOutline = (data) => async (dispatch) => {

    dispatch(generateOneOutlineRequest());

    try {
        var payload = await blogService.generateOneOutline(data);
        dispatch(generateOneOutlineSuccess(payload));
        return payload;
    } catch (error) {
        dispatch(generateOneOutlineFailed());
        dispatch(openSnackBar({ message: error["message"], status: 'error' }));
        // throw new Error(error);
        return false;
    }
}

export const generateLongArticle = (data) => async (dispatch) => {

    dispatch(generateLongArticleRequest());

    try {
        var payload = await blogService.generateLongArticle(data);
        dispatch(generateLongArticleSuccess(payload));
        return payload;
    } catch (error) {
        dispatch(generateLongArticleFailed());
        dispatch(openSnackBar({ message: error["message"], status: 'error' }));
        // throw new Error(error);
        return false;
    }
}

export const paraphrasingRewriteQuillbot = (data) => async (dispatch) => {

    dispatch(paraphrasingRewriteQuillbotRequest());

    try {
        var payload = await blogService.paraphrasingRewriteQuillbot(data);
        dispatch(paraphrasingRewriteQuillbotSuccess(payload));
        return payload;
    } catch (error) {
        dispatch(paraphrasingRewriteQuillbotFailed());
        dispatch(openSnackBar({ message: error["message"], status: 'error' }));
        // throw new Error(error);
        return false;
    }
}

export const contentImprover = (data) => async (dispatch) => {

    dispatch(contentImproverRequest());

    try {
        var payload = await blogService.contentImprover(data);
        dispatch(contentImproverSuccess(payload));
        return payload;
    } catch (error) {
        dispatch(contentImproverFailed());
        dispatch(openSnackBar({ message: error["message"], status: 'error' }));
        // throw new Error(error);
        return false;
    }
}

export const generateBlogIdeaOutline = (data) => async (dispatch) => {

    dispatch(generateBlogIdeaOutlineRequest());

    try {
        var payload = await blogService.generateBlogIdeaOutline(data);
        dispatch(generateBlogIdeaOutlineSuccess(payload));
        return payload;
    } catch (error) {
        dispatch(generateBlogIdeaOutlineFailed());
        dispatch(openSnackBar({ message: error["message"], status: 'error' }));
        // throw new Error(error);
        return false;
    }
}

export const generateBlogIntroParagraph = (data) => async (dispatch) => {

    dispatch(generateBlogIntroParagraphRequest());

    try {
        var payload = await blogService.generateBlogIntroParagraph(data);
        dispatch(generateBlogIntroParagraphSuccess(payload));
        return payload;
    } catch (error) {
        dispatch(generateBlogIntroParagraphFailed());
        dispatch(openSnackBar({ message: error["message"], status: 'error' }));
        // throw new Error(error);
        return false;
    }
}

export const generateBlogSeoTitleMetaDescription = (data) => async (dispatch) => {

    dispatch(generateBlogSeoTitleMetaDescriptionRequest());

    try {
        var payload = await blogService.generateBlogSeoTitleMetaDescription(data);
        dispatch(generateBlogSeoTitleMetaDescriptionSuccess(payload));
        return payload;
    } catch (error) {
        dispatch(generateBlogSeoTitleMetaDescriptionFailed());
        dispatch(openSnackBar({ message: error["message"], status: 'error' }));
        // throw new Error(error);
        return false;
    }
}

export const generateInterviewQuestion = (data) => async (dispatch) => {

    dispatch(generateInterviewQuestionRequest());

    try {
        var payload = await blogService.generateInterviewQuestion(data);
        dispatch(generateInterviewQuestionSuccess(payload));
        return payload;
    } catch (error) {
        dispatch(generateInterviewQuestionFailed());
        dispatch(openSnackBar({ message: error["message"], status: 'error' }));
        // throw new Error(error);
        return false;
    }
}

export default blogSlice.reducer;