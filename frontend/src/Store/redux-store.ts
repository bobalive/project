import {configureStore} from "@reduxjs/toolkit";
import collectionReduser from "./Slices/collectionSlice.ts";


export const store = configureStore({
    reducer:{
        collections:collectionReduser
    }
})