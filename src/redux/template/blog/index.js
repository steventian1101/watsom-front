import { createSlice } from "@reduxjs/toolkit";
import { openSnackBar } from "../../snackBarReducer";

import { blogService } from '../../../services/blog.service'

export const blogSlice = createSlice({
    name: "blog",
    initialState: {
        generateOutlineState: false,
        outline: []
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
    }
});

const {
    generateOutlineFailed, generateOutlineRequest, generateOutlineSuccess
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

export default blogSlice.reducer;