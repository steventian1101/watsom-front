import { createSlice } from "@reduxjs/toolkit";
import { openSnackBar } from "../../snackBarReducer";

import { contentService } from '../../../services/content.service'

export const contentSlice = createSlice({
    name: "content",
    initialState: {
        contentImproveState: false,
    },
    reducers: {
        contentImproveRequest: state => {
            state.contentImproveState = true
        },
        contentImproveSuccess: (state, action) => {
            state.contentImproveState = false;
            state.result = action.payload.result;
        },
        contentImproveFailed: (state, action) => {
            state.contentImproveState = false;
        },
    }
});

const {
    contentImproveFailed, contentImproveRequest, contentImproveSuccess
} = contentSlice.actions;

export const contentImprove = (data) => async (dispatch) => {

    dispatch(contentImproveRequest());

    try {
        var payload = await contentService.contentImprove(data);
        dispatch(contentImproveSuccess(payload));
        return payload;
    } catch (error) {
        dispatch(contentImproveFailed());
        dispatch(openSnackBar({ message: error["message"], status: 'error' }));
        // throw new Error(error);
        return false;
    }
}

export default contentSlice.reducer;