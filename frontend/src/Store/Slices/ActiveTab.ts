import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const ActiveTabSlice = createSlice({
    name:'activeTab',
    initialState:{active:0},
    reducers:{
        setActiveTab(state,action:PayloadAction<number>){
            state.active = action.payload
        }
    }
})

export const {setActiveTab} = ActiveTabSlice.actions

export default ActiveTabSlice.reducer