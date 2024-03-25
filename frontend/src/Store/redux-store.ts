import {configureStore} from "@reduxjs/toolkit";
import collectionReduser from "./Slices/collectionSlice.ts";
import UserSlice from "./Slices/userSlice.ts";
import themeSlice from "./Slices/themeSlice.ts";


export const store = configureStore({
    reducer:{
        user:UserSlice,
        collections:collectionReduser,
        theme:themeSlice
    }
})