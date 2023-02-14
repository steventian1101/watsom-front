import { createSlice } from "@reduxjs/toolkit";
import { openSnackBar } from "./snackBarReducer";

export const globalSlice = createSlice({
    name: "global",
    initialState: {
        language: "sp",
        setLanguageState: false,
        current_document: "",
        setCurrentDocumentState: false
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
        setCurrentDocumentRequest: state => {
            state.setCurrentDocumentState = true
        },
        setCurrentDocumentSuccess: (state, action) => {
            state.setCurrentDocumentState = false;
            state.current_document = action.payload;
        },
        setCurrentDocumentFailed: (state, action) => {
            state.setCurrentDocumentState = false;
        },
    }
});

const {
    setLanguageFailed, setLanguageRequest, setLanguageSuccess,
    setCurrentDocumentFailed, setCurrentDocumentRequest, setCurrentDocumentSuccess
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

export const setCurrentDocument = (doc) => async (dispatch) => {

    dispatch(setCurrentDocumentRequest());

    try {
        dispatch(setCurrentDocumentSuccess(doc));
    } catch (error) {
        dispatch(setCurrentDocumentFailed());
        dispatch(openSnackBar({ message: error["message"], status: 'error' }));
        throw new Error(error);
    }
}

export default globalSlice.reducer;