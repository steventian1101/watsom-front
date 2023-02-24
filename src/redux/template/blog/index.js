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
    }
});

const {
    generateOutlineFailed, generateOutlineRequest, generateOutlineSuccess,
    generateOneOutlineFailed, generateOneOutlineRequest, generateOneOutlineSuccess,
    generateLongArticleFailed, generateLongArticleRequest, generateLongArticleSuccess,
    contentImproverFailed, contentImproverRequest, contentImproverSuccess
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

export default blogSlice.reducer;