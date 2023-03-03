import { createSlice } from "@reduxjs/toolkit";
import { openSnackBar } from "./snackBarReducer";

export const globalSlice = createSlice({
    name: "global",
    initialState: {
        language: "en",
        setLanguageState: false,
        output_language: "French",
        setOutputLanguageState: false,
        current_document: "",
        setCurrentDocumentState: false,
        setLoadingState: false,
        loading: false,
        setExpandGroupState: false,
        current_expanded_group: ""
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
        setOutputLanguageRequest: state => {
            state.setOutputLanguageState = true
        },
        setOutputLanguageSuccess: (state, action) => {
            state.setOutputLanguageState = false;
            state.output_language = action.payload;
        },
        setOutputLanguageFailed: (state, action) => {
            state.setOutputLanguageState = false;
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
        setLoadingRequest: state => {
            state.setLoadingState = true
        },
        setLoadingSuccess: (state, action) => {
            state.setLoadingState = false;
            state.loading = action.payload;
        },
        setLoadingFailed: (state, action) => {
            state.setLoadingState = false;
        },
        setExpandGroupRequest: state => {
            state.setExpandGroupState = true
        },
        setExpandGroupSuccess: (state, action) => {
            state.setExpandGroupState = false;
            state.current_expanded_group = action.payload;
        },
        setExpandGroupFailed: (state, action) => {
            state.setExpandGroupState = false;
        },
    }
});

const {
    setLanguageFailed, setLanguageRequest, setLanguageSuccess,
    setOutputLanguageFailed, setOutputLanguageRequest, setOutputLanguageSuccess,
    setCurrentDocumentFailed, setCurrentDocumentRequest, setCurrentDocumentSuccess,
    setLoadingFailed, setLoadingRequest, setLoadingSuccess,
    setExpandGroupFailed, setExpandGroupRequest, setExpandGroupSuccess
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

export const setOutputCurrentLanguage = (lang) => async (dispatch) => {

    dispatch(setOutputLanguageRequest());

    try {
        dispatch(setOutputLanguageSuccess(lang));
    } catch (error) {
        dispatch(setOutputLanguageFailed());
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

export const setLoading = (state) => async (dispatch) => {

    dispatch(setLoadingRequest());

    try {
        dispatch(setLoadingSuccess(state));
    } catch (error) {
        dispatch(setLoadingFailed());
        dispatch(openSnackBar({ message: error["message"], status: 'error' }));
        throw new Error(error);
    }
}

export const setExpandGroup = (state) => async (dispatch) => {

    dispatch(setExpandGroupRequest());

    try {
        dispatch(setExpandGroupSuccess(state));
    } catch (error) {
        dispatch(setExpandGroupFailed());
        dispatch(openSnackBar({ message: error["message"], status: 'error' }));
        throw new Error(error);
    }
}

export default globalSlice.reducer;