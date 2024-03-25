import {createSlice} from "@reduxjs/toolkit";


const themeSlice = createSlice({
    name:'theme',
    initialState:{
        value:localStorage.getItem('theme')
    },
    reducers:{
        setTheme(state , action){
            state.value = action.payload
            localStorage.setItem('theme', action.payload)
        }
    }
})


export const {setTheme} = themeSlice.actions
export default  themeSlice.reducer