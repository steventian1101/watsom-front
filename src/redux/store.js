import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from './authReducer';
import snackBarReducer from "./snackBarReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import globalReducer from './globalReducer';
import blogReducer from './template/blog';
import youtubeReducer from './template/youtube';
import socialReducer from './template/social_media';
import amazonReducer from './template/amazon';

const rootReducer = combineReducers({
    authState: authReducer,
    snackBarState: snackBarReducer,

    globalState: globalReducer,
    blogState: blogReducer,
    youtubeState: youtubeReducer,
    socialState: socialReducer,
    amazonState: amazonReducer,
})


export default configureStore({
    reducer: rootReducer
}, composeWithDevTools);