import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CollectionInterface} from "../../interfaces/Collection.interface.ts";



interface InitialStateInterface{
    topCollections:CollectionInterface[],
    myCollections:CollectionInterface[]
}

const initialState:InitialStateInterface = {
    topCollections:[{
        name: '',
        items: [],
        custom_fields: {
            custom_string:[],
            custom_multi_line:[],
            custom_int:[],
            custom_date:[],
            custom_boolean:[]
        },
        photo: '',
        userId: '',
        description:'',
        theme:"Silverware",
        _id:"0"
    }],
    myCollections:[{
        name: '',
        items: [],
        custom_fields: {
            custom_boolean:[],
            custom_date:[],
            custom_int:[],
            custom_multi_line:[],
            custom_string:[]
        },
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
        },
        setMyCollection:(state:InitialStateInterface , action:PayloadAction<CollectionInterface[]>)=>{
            state.myCollections= [...action.payload]
        },
        addMyCollection:(state:InitialStateInterface , action:PayloadAction<CollectionInterface>)=>{
            state.myCollections = [{...action.payload} , ...state.myCollections]
        }
    }
})

export const {setCollection, setMyCollection,addMyCollection} = collectionSlice.actions
export default collectionSlice.reducer
