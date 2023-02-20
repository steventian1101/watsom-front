import { createSlice } from "@reduxjs/toolkit";
import { openSnackBar } from "../../snackBarReducer";

import { amazonService } from '../../../services/amazon.service'

export const amazonSlice = createSlice({
    name: "amazon",
    initialState: {
        generateAmazonProductFeatureState: false,
        generateYoutubeDescriptionState: false
    },
    reducers: {
        generateAmazonProductFeatureRequest: state => {
            state.generateAmazonProductFeatureState = true
        },
        generateAmazonProductFeatureSuccess: (state, action) => {
            state.generateAmazonProductFeatureState = false;
        },
        generateAmazonProductFeatureFailed: (state, action) => {
            state.generateAmazonProductFeatureState = false;
        },
        generateAmazonProductTitleRequest: state => {
            state.generateYoutubeDescriptionState = true
        },
        generateAmazonProductTitleSuccess: (state, action) => {
            state.generateAmazonProductTitleState = false;
        },
        generateAmazonProductTitleFailed: (state, action) => {
            state.generateAmazonProductTitleState = false;
        },
    }
});

const {
    generateAmazonProductFeatureFailed, generateAmazonProductFeatureRequest, generateAmazonProductFeatureSuccess,
    generateAmazonProductTitleFailed, generateAmazonProductTitleRequest, generateAmazonProductTitleSuccess
} = amazonSlice.actions;

export const generateAmazonProductFeature = (data) => async (dispatch) => {

    dispatch(generateAmazonProductFeatureRequest());

    try {
        var payload = await amazonService.generateAmazonProductFeature(data);
        dispatch(generateAmazonProductFeatureSuccess(payload));
        return payload;
    } catch (error) {
        dispatch(generateAmazonProductFeatureFailed());
        dispatch(openSnackBar({ message: error["message"], status: 'error' }));
        // throw new Error(error);
        return false;
    }
}

export const generateAmazonProductTitle = (data) => async (dispatch) => {

    dispatch(generateAmazonProductTitleRequest());

    try {
        var payload = await amazonService.generateAmazonProductTitle(data);
        dispatch(generateAmazonProductTitleSuccess(payload));
        return payload;
    } catch (error) {
        dispatch(generateAmazonProductTitleFailed());
        dispatch(openSnackBar({ message: error["message"], status: 'error' }));
        // throw new Error(error);
        return false;
    }
}

export default amazonSlice.reducer;