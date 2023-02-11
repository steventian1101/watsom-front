import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from './authReducer';
import snackBarReducer from "./snackBarReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import globalReducer from './globalReducer';

const rootReducer = combineReducers({
    authState: authReducer,
    snackBarState: snackBarReducer,

    globalState: globalReducer,
})


export default configureStore({
    reducer: rootReducer
}, composeWithDevTools);