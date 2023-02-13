import { createSlice } from "@reduxjs/toolkit";
import { openSnackBar } from "../../snackBarReducer";

import { contentService } from '../../../services/content.service'

export const contentSlice = createSlice({
    name: "content",
    initialState: {
        contentImproverState: false,
    },
    reducers: {
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
    contentImproverFailed, contentImproverRequest, contentImproverSuccess
} = contentSlice.actions;

export const contentImprover = (data) => async (dispatch) => {

    dispatch(contentImproverRequest());

    try {
        var payload = await contentService.contentImprover(data);
        dispatch(contentImproverSuccess(payload));
        return payload;
    } catch (error) {
        dispatch(contentImproverFailed());
        dispatch(openSnackBar({ message: error["message"], status: 'error' }));
        // throw new Error(error);
        return false;
    }
}

export default contentSlice.reducer;