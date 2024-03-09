import {configureStore} from "@reduxjs/toolkit";
import userReduser from "./userSlice.ts";


export const store = configureStore({
    reducer:{
        user:userReduser,
    }
})