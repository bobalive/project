import axios, {AxiosResponse} from "axios";
import {ItemInterface} from "../interfaces/Item.interface.ts";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;



export const getItems = async (id:string): Promise<ItemInterface[]|undefined > =>{
    try{
        const response:AxiosResponse<ItemInterface[]> = await axios.get('http://localhost:500/api/item/getCollections/'+id)
        if(response.status){
            return response.data
        }
    } catch (e){
        throw error
    }
}
export const createItems = async (item:ItemInterface)=>{
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
