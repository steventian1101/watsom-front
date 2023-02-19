import { createSlice } from "@reduxjs/toolkit";
import { openSnackBar } from "../../snackBarReducer";

import { amazonService } from '../../../services/amazon.service'

export const amazonSlice = createSlice({
    name: "amazon",
    initialState: {
        generateAmazonProductFeatureState: false,
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
    }
});

const {
    generateAmazonProductFeatureFailed, generateAmazonProductFeatureRequest, generateAmazonProductFeatureSuccess,
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

export default amazonSlice.reducer;