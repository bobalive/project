import axios, { AxiosResponse } from 'axios';
import {CollectionInterface} from "../interfaces/Collection.interface.ts";
import {UserInteface} from "../interfaces/User.interface.ts";
import {LoginInterface, SigninInterface} from "../interfaces/Login.interface.ts";
import {CreateCollectionsInterface} from "../interfaces/CreacteCollectionInteface.ts";


export const getTopCollections = async (): Promise<CollectionInterface[]> => {
    try {
        const response: AxiosResponse<CollectionInterface[]> = await axios.get("http://localhost:5000/api/collections/top");

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


export const getOneCollection = async (id:string):Promise<CollectionInterface[]| null>=>{
    try{
        const response:AxiosResponse<CollectionInterface[]> = await axios.get("http://localhost:5000/api/collections/collection/"+id)
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

export const login = async ({ email, password }: LoginInterface): Promise<UserInteface[]|null|undefined> => {
    try {
        const response: AxiosResponse<UserInteface[]> = await axios.post('http://localhost:5000/api/auth', { email, password },{
            withCredentials:true
        });
        console.log(response);

        // Handle status 200
        if (response.status === 200) {
            return response.data;
        }
    } catch (error: any) { // Specify any type to catch all errors
        // Handle other errors
        if (axios.isAxiosError(error) && error.response && error.response.status === 400) {
            // Handle status 400 (Bad Request)
            return null
        } else {
            console.log(error)
            return null
        }
    }
};

export const signin = async ({name, password,email}:SigninInterface):Promise<UserInteface|null|undefined> =>{
    try{
        const response:AxiosResponse<UserInteface> = await axios.post("http://localhost:5000/api/signin" ,{name,password , email})
        if(response.status == 200){
            return response.data
        }
        return null
    }catch (e){
        return null
    }
}

export const getUser = async ()=>{
    try{
        const response = await axios.get('http://localhost:5000/api/',{
            withCredentials:true
        })
        console.log(response.data);
        return response.data
    }catch (e){
        return null
    }
}

export const logout = async ()=>{
    const response = await axios.get('http://localhost:5000/api/logout',{
        withCredentials:true
    })
    if(response.status == 200){
        return true;
    }
}

export const getMyColletion = async ():Promise<CollectionInterface[]|undefined>=>{
    const response:AxiosResponse<CollectionInterface[]>= await axios.get('http://localhost:5000/api/collections/my-collection' ,{
        withCredentials:true
    })
    if(response.status == 200){
        return response.data.reverse()
    }
}

export const createCollection = async ({name,description,theme,photo}:CreateCollectionsInterface)=>{
    console.log(photo)
    const response = await axios.post('http://localhost:5000/api/collections/create' ,{
    collections:{
        name,
        description ,
        theme
    }},{
        withCredentials:true
    })
    if(response.status == 200){
        console.log('added')
        console.log(response.data)
    }

}


