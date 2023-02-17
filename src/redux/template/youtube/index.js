import { createSlice } from "@reduxjs/toolkit";
import { openSnackBar } from "../../snackBarReducer";

import { youtubeService } from '../../../services/youtube.service'

export const youtubeSlice = createSlice({
    name: "youtube",
    initialState: {
        generateYoutubeDescriptionState: false
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
    }
});

const {
    generateYoutubeDescriptionFailed, generateYoutubeDescriptionRequest, generateYoutubeDescriptionSuccess
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

export default youtubeSlice.reducer;