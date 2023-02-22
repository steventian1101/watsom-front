import { createSlice } from "@reduxjs/toolkit";
import { openSnackBar } from "../../snackBarReducer";

import { adsService } from '../../../services/ads.service'

export const adsSlice = createSlice({
    name: "ads",
    initialState: {
        generateFacebookAdsState: false,
        generateGoogleAdsState: false,
    },
    reducers: {
        generateFacebookAdsRequest: state => {
            state.generateFacebookAdsState = true
        },
        generateFacebookAdsSuccess: (state, action) => {
            state.generateFacebookAdsState = false;
        },
        generateFacebookAdsFailed: (state, action) => {
            state.generateFacebookAdsState = false;
        },
        generateGoogleAdsRequest: state => {
            state.generateGoogleAdsState = true
        },
        generateGoogleAdsSuccess: (state, action) => {
            state.generateGoogleAdsState = false;
        },
        generateGoogleAdsFailed: (state, action) => {
            state.generateGoogleAdsState = false;
        },
    }
});

const {
    generateFacebookAdsFailed, generateFacebookAdsRequest, generateFacebookAdsSuccess,
    generateGoogleAdsFailed, generateGoogleAdsRequest, generateGoogleAdsSuccess
} = adsSlice.actions;

export const generateFacebookAds = (data) => async (dispatch) => {

    dispatch(generateFacebookAdsRequest());

    try {
        var payload = await adsService.generateFacebookAds(data);
        dispatch(generateFacebookAdsSuccess(payload));
        return payload;
    } catch (error) {
        dispatch(generateFacebookAdsFailed());
        dispatch(openSnackBar({ message: error["message"], status: 'error' }));
        // throw new Error(error);
        return false;
    }
}

export const generateGoogleAds = (data) => async (dispatch) => {

    dispatch(generateGoogleAdsRequest());

    try {
        var payload = await adsService.generateGoogleAds(data);
        dispatch(generateGoogleAdsSuccess(payload));
        return payload;
    } catch (error) {
        dispatch(generateGoogleAdsFailed());
        dispatch(openSnackBar({ message: error["message"], status: 'error' }));
        // throw new Error(error);
        return false;
    }
}

export default adsSlice.reducer;