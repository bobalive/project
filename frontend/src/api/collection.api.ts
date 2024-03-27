import axios, {AxiosResponse} from "axios";
import {CollectionInterface} from "../interfaces/Collection.interface.ts";

export const getTopCollections = async (): Promise<CollectionInterface[]> => {
    try {
        const response: AxiosResponse<CollectionInterface[]> = await axios.get(import.meta.env.VITE_API+"/api/collections/top");

        if (response.status === 200) {
            return response.data;
        } else {
            // Handle other HTTP status codes or errors if needed
            throw new Error(`Failed to fetch top collections. Status code: ${response.status}`);
        }
    } catch (error) {
        // Handle network errors or exceptions
        console.error("Error fetching top collections:", error);
        throw error;
    }
};
export const deleteColections = async (id:string[])=>{
    console.log(id)
    try{
        const response:AxiosResponse<CollectionInterface[]> = await axios.delete(import.meta.env.VITE_API+'/api/collections/delete',{data:{id}, withCredentials:true})
        if(response.status == 200){
            return response.data
        }
    }catch (e){
        console.log(e)
    }
}
export const createCollection = async (formData:FormData)=>{
    const response = await axios.post(import.meta.env.VITE_API+'/api/collections/create' , formData,{
        withCredentials:true
    })
    if(response.status == 200){
        console.log('added')
        console.log(response.data)
    }

}
export const getMyColletion = async ():Promise<CollectionInterface[]|undefined>=>{
    const response:AxiosResponse<CollectionInterface[]>= await axios.get(import.meta.env.VITE_API+'/api/collections/my-collection' ,{
        withCredentials:true
    })
    if(response.status == 200){
        return response.data.reverse()
    }
}
export const getOneCollection = async (id:string):Promise<CollectionInterface[]>=>{
    try{
        const response:AxiosResponse<CollectionInterface[]> = await axios.get(import.meta.env.VITE_API+'/api/collections/collection/'+id)
        if(response.status == 200){
            return response.data
        }else{
            throw new Error("Failed to fetch top collections. Status code " + response.data)
        }
    }catch (error) {
        // Handle network errors or exceptions
        console.error("Error fetching top collections:", error);
        throw error;
    }
}

export const deleteCustomField = async (collectionId:string,valueId:number,field:string)=>{

    try {
        const response:AxiosResponse<CollectionInterface> = await axios.delete(`${import.meta.env.VITE_API}/api/collections/customFields/delete?collectionId=${collectionId}&valueId=${valueId}&field=${field}`)
        if(response.status === 200){
            return response.data
        }else{
            throw new Error("Failed to fetch top collections. Status code " + response.data)
        }

    }catch (error) {
        // Handle network errors or exceptions
        console.error("Error fetching top collections:", error);
        throw error;
    }
}

export const editCollection = async (formData:FormData)=>{
    try{
        const response:AxiosResponse<CollectionInterface> = await axios.post(import.meta.env.VITE_API+'/api/collections/edit' , formData,{
            withCredentials:true
        })
        if(response.status === 200){
            return response.data
        }else{
            throw new Error("Failed to fetch top collections. Status code " + response.data)
        }

    }catch (error) {
        // Handle network errors or exceptions
        console.error("Error fetching top collections:", error);
        throw error;
    }
}

