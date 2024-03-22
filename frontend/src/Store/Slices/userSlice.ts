import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserInteface} from "../../interfaces/User.interface.ts";

const initialState:UserInteface = {
    _id:"",
    name:'',
    email:'',
    password:'',
    role:'user',
    status:'blocked'
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        putUser(state:UserInteface, action:PayloadAction<UserInteface>){
            const {status,name,email,password,role}= action.payload
            state.role = role
            state.status = status
            state.name= name
            state.email = email
            state.password = password
        }
    }
})

export const {putUser }= userSlice.actions
export default userSlice.reducer