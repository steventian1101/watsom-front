import { createSlice } from "@reduxjs/toolkit";
import { openSnackBar } from "./snackBarReducer";

export const globalSlice = createSlice({
    name: "global",
    initialState: {
        language: "en",
        setLanguageState: false,
    },
    reducers: {
        setLanguageRequest: state => {
            state.setLanguageState = true
        },
        setLanguageSuccess: (state, action) => {
            state.setLanguageState = false;
            state.language = action.payload;
        },
        setLanguageFailed: (state, action) => {
            state.setLanguageState = false;
        },
    }
});

const {
    setLanguageFailed, setLanguageRequest, setLanguageSuccess,
} = globalSlice.actions;

export const setCurrentLanguage = (lang) => async (dispatch) => {

    dispatch(setLanguageRequest());

    try {
        dispatch(setLanguageSuccess(lang));
    } catch (error) {
        dispatch(setLanguageFailed());
        dispatch(openSnackBar({ message: error["message"], status: 'error' }));
        throw new Error(error);
    }
}

export default globalSlice.reducer;