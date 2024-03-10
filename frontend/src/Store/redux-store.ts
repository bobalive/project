import {configureStore} from "@reduxjs/toolkit";
import collectionReduser from "./collectionSlice.ts";


export const store = configureStore({
    reducer:{
        collections:collectionReduser
    }
})