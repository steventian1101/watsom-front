import { createSlice } from "@reduxjs/toolkit";
import { openSnackBar } from "../../snackBarReducer";

import { youtubeService } from '../../../services/youtube.service'

export const youtubeSlice = createSlice({
    name: "youtube",
    initialState: {
        generateYoutubeDescriptionState: false,
        generateYoutubeHookIntroductionState: false,
    },
    reducers: {
        generateYoutubeDescriptionRequest: state => {
            state.generateYoutubeDescriptionState = true
        },
        generateYoutubeDescriptionSuccess: (state, action) => {
            state.generateYoutubeDescriptionState = false;
        },
        generateYoutubeDescriptionFailed: (state, action) => {
            state.generateYoutubeDescriptionState = false;
        },
        generateYoutubeHookIntroductionRequest: state => {
            state.generateYoutubeDescriptionState = true
        },
        generateYoutubeHookIntroductionSuccess: (state, action) => {
            state.generateYoutubeHookIntroductionState = false;
        },
        generateYoutubeHookIntroductionFailed: (state, action) => {
            state.generateYoutubeHookIntroductionState = false;
        },
    }
});

const {
    generateYoutubeDescriptionFailed, generateYoutubeDescriptionRequest, generateYoutubeDescriptionSuccess,
    generateYoutubeHookIntroductionFailed, generateYoutubeHookIntroductionRequest, generateYoutubeHookIntroductionSuccess
} = youtubeSlice.actions;

export const generateYoutubeDescription = (data) => async (dispatch) => {

    dispatch(generateYoutubeDescriptionRequest());

    try {
        var payload = await youtubeService.generateYoutubeDescription(data);
        dispatch(generateYoutubeDescriptionSuccess(payload));
        return payload;
    } catch (error) {
        dispatch(generateYoutubeDescriptionFailed());
        dispatch(openSnackBar({ message: error["message"], status: 'error' }));
        // throw new Error(error);
        return false;
    }
}

export const generateYoutubeHookIntroduction = (data) => async (dispatch) => {

    dispatch(generateYoutubeHookIntroductionRequest());

    try {
        var payload = await youtubeService.generateYoutubeHookIntroduction(data);
        dispatch(generateYoutubeHookIntroductionSuccess(payload));
        return payload;
    } catch (error) {
        dispatch(generateYoutubeHookIntroductionFailed());
        dispatch(openSnackBar({ message: error["message"], status: 'error' }));
        // throw new Error(error);
        return false;
    }
}

export default youtubeSlice.reducer;