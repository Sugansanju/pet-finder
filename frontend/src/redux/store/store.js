import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/authSlice";
import petReducer from "../slice/petSlice";

const store=configureStore({
    reducer:{
        auth:authReducer,
        pet:petReducer
    }
});
export default store;