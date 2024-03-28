import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserInteface} from "../../interfaces/User.interface.ts";
import {checkIsAuth} from "../../api/user.api.ts";

const initialState:UserInteface = {
    _id:"",
    name:'',
    email:'',
    password:'',
    role:'user',
    status:'blocked'
}

export const auth = createAsyncThunk(
    'data/fetchData',
    checkIsAuth
);

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        putUser(state:UserInteface, action:PayloadAction<UserInteface>){
            const {_id,status,name,email,password,role}= action.payload
            state._id = _id
            state.role = role
            state.status = status
            state.name= name
            state.email = email
            state.password = password
            }

    },
    extraReducers:(builder) => {
        builder.addCase(auth.fulfilled ,(state,action)=>{

            if(action.payload && action.payload._id) {
                const {_id, status, name, email, password, role} = action.payload
                state._id = _id
                state.role = role
                state.status = status
                state.name = name
                state.email = email
                state.password = password
            }else {
                const {_id, status, name, email, password, role} = initialState
                state._id = _id
                state.role = role
                state.status = status
                state.name = name
                state.email = email
                state.password = password
            }
        })
    }
})

export const {putUser  }= userSlice.actions
export default userSlice.reducer