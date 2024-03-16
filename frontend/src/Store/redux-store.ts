import {configureStore} from "@reduxjs/toolkit";
import collectionReduser from "./Slices/collectionSlice.ts";
import UserSlice from "./Slices/userSlice.ts";
import ActiveTabSlice from "./Slices/ActiveTab.ts";


export const store = configureStore({
    reducer:{
        user:UserSlice,
        collections:collectionReduser,
        activeTab:ActiveTabSlice
    }
})