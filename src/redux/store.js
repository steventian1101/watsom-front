import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from './authReducer';
import snackBarReducer from "./snackBarReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import globalReducer from './globalReducer';
import contentReducer from './template/content';
import blogReducer from './template/blog';

const rootReducer = combineReducers({
    authState: authReducer,
    snackBarState: snackBarReducer,

    globalState: globalReducer,
    contentState: contentReducer,
    blogState: blogReducer,
})


export default configureStore({
    reducer: rootReducer
}, composeWithDevTools);