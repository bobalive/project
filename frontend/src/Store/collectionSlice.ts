import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CollectionInterface} from "../interfaces/Collection.interface.ts";


interface InitialStateInterface{
    topCollections?:CollectionInterface[],
    myCollections?:CollectionInterface[]
}

const initialState:InitialStateInterface = {
    topCollections:[{
        name: '',
        items: [],
        custom_Fields: {},
        photo: '',
        userId: '',
        description:'',
        theme:"Silverware",
        _id:"0"
    }]
}


export const collectionSlice = createSlice({
    name:'collections',
    initialState,
    reducers:{
        setCollection:(state:InitialStateInterface, action:PayloadAction<CollectionInterface[]>)=>{
            state.topCollections = [...action.payload]
        }
    }
})

export const {setCollection} = collectionSlice.actions
export default collectionSlice.reducer
