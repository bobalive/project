import axios, { AxiosResponse} from "axios";
import {DeleteItemsInterface, ItemInterface, SendItemInterface} from "../interfaces/Item.interface.ts";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {CollectionInfoInterface} from "../interfaces/СollectionInfo.interface.ts";




export const getItems = async (id:string): Promise<ItemInterface[]|undefined > =>{
    try{
        const response:AxiosResponse<ItemInterface[]> = await axios.get('http://localhost:5000/api/item/getCollections/'+id)

        if(response.status){
            console.log(response)
            return response.data
        }

    } catch (e){

        throw error
    }
}
export const createItems = async (item:SendItemInterface)=>{
    try{
        const response:AxiosResponse<ItemInterface> = await axios.post('http://localhost:5000/api/item/create',{item},{
            withCredentials:true
        })
        if(response.status ===200){
            console.log('created')
        }


    }catch (e){
        console.error(e)

        throw error
    }
}
export const deleteItems = async ({id, collectionId}:DeleteItemsInterface):Promise<ItemInterface[]|null >=>{
    try {

        const response: AxiosResponse<ItemInterface[]> = await axios.delete('http://localhost:5000/api/item/delete', {
            data:{
                id,
                collectionId
            },
            withCredentials:true
        })
        if(response.status == 200){
            return response.data
        }
        return null
    }catch (e){
        console.error(e)
        return null
        throw error
    }

}

export const getСollectionInfo = async (id:string)=>{
    const response:AxiosResponse<CollectionInfoInterface> = await axios.get('http://localhost:5000/api/collections/customFields/'+id)
    if(response.status == 200){
        return response.data
    }
}

export const getItem = async (id:string)=>{
    try{
        const response:AxiosResponse<ItemInterface> = await axios.get('http://localhost:5000/api/item/getItem/'+id);
        if(response.status == 200){
            return response.data
        }
    }catch (e){
        console.log(e)
        throw error
    }

}
export const changeItem  = async(item:ItemInterface)=>{
    try {
        const response:AxiosResponse<ItemInterface> = await  axios.post('http://localhost:5000/api/item/edit' ,item,{
            withCredentials:true
        })
        if(response.status === 200){
            return response.data
        }
    }catch (e){
        console.log(e)
        throw e
    }
}
