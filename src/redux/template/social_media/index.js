import { createSlice } from "@reduxjs/toolkit";
import { openSnackBar } from "../../snackBarReducer";

import { socialService } from '../../../services/social.service'

export const socialSlice = createSlice({
    name: "social",
    initialState: {
        generatePinterestTitleDescriptionState: false,
        generatePhotoPostCaptionState: false,
        generateOpinionPieceColumnState: false
    },
    reducers: {
        generatePinterestTitleDescriptionRequest: state => {
            state.generatePinterestTitleDescriptionState = true
        },
        generatePinterestTitleDescriptionSuccess: (state, action) => {
            state.generatePinterestTitleDescriptionState = false;
        },
        generatePinterestTitleDescriptionFailed: (state, action) => {
            state.generatePinterestTitleDescriptionState = false;
        },
        generatePhotoPostCaptionRequest: state => {
            state.generatePhotoPostCaptionState = true
        },
        generatePhotoPostCaptionSuccess: (state, action) => {
            state.generatePhotoPostCaptionState = false;
        },
        generatePhotoPostCaptionFailed: (state, action) => {
            state.generatePhotoPostCaptionState = false;
        },
        generateOpinionPieceColumnRequest: state => {
            state.generateOpinionPieceColumnState = true
        },
        generateOpinionPieceColumnSuccess: (state, action) => {
            state.generateOpinionPieceColumnState = false;
        },
        generateOpinionPieceColumnFailed: (state, action) => {
            state.generateOpinionPieceColumnState = false;
        },
    }
});

const {
    generatePinterestTitleDescriptionFailed, generatePinterestTitleDescriptionRequest, generatePinterestTitleDescriptionSuccess,
    generatePhotoPostCaptionFailed, generatePhotoPostCaptionRequest, generatePhotoPostCaptionSuccess,
    generateOpinionPieceColumnFailed, generateOpinionPieceColumnRequest, generateOpinionPieceColumnSuccess
} = socialSlice.actions;

export const generatePinterestTitleDescription = (data) => async (dispatch) => {

    dispatch(generatePinterestTitleDescriptionRequest());

    try {
        var payload = await socialService.generatePinterestTitleDescription(data);
        dispatch(generatePinterestTitleDescriptionSuccess(payload));
        return payload;
    } catch (error) {
        dispatch(generatePinterestTitleDescriptionFailed());
        dispatch(openSnackBar({ message: error["message"], status: 'error' }));
        // throw new Error(error);
        return false;
    }
}

export const generatePhotoPostCaption = (data) => async (dispatch) => {

    dispatch(generatePhotoPostCaptionRequest());

    try {
        var payload = await socialService.generatePhotoPostCaption(data);
        dispatch(generatePhotoPostCaptionSuccess(payload));
        return payload;
    } catch (error) {
        dispatch(generatePhotoPostCaptionFailed());
        dispatch(openSnackBar({ message: error["message"], status: 'error' }));
        // throw new Error(error);
        return false;
    }
}

export const generateOpinionPieceColumn = (data) => async (dispatch) => {

    dispatch(generateOpinionPieceColumnRequest());

    try {
        var payload = await socialService.generateOpinionPieceColumn(data);
        dispatch(generateOpinionPieceColumnSuccess(payload));
        return payload;
    } catch (error) {
        dispatch(generateOpinionPieceColumnFailed());
        dispatch(openSnackBar({ message: error["message"], status: 'error' }));
        // throw new Error(error);
        return false;
    }
}

export default socialSlice.reducer;