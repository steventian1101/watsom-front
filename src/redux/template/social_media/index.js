import { createSlice } from "@reduxjs/toolkit";
import { openSnackBar } from "../../snackBarReducer";

import { socialService } from '../../../services/social.service'

export const socialSlice = createSlice({
    name: "social",
    initialState: {
        generatePinterestTitleDescriptionState: false,
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
    }
});

const {
    generatePinterestTitleDescriptionFailed, generatePinterestTitleDescriptionRequest, generatePinterestTitleDescriptionSuccess,
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

export default socialSlice.reducer;