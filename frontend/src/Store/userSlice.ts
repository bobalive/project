import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    count:1
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        addNumber:(state , action)=>{
            state.count += action.payload
        }
    }
})

export const {addNumber }= userSlice.actions
export default userSlice.reducer