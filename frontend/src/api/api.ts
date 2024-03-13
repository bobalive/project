import axios, { AxiosResponse, AxiosError } from 'axios';
import {CollectionInterface} from "../interfaces/Collection.interface.ts";
import {UserInteface} from "../interfaces/User.interface.ts";
import {LoginInterface} from "../interfaces/Login.interface.ts";

 interface error{
    error:string
}

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

export const getOneCollection = async (id:string):Promise<CollectionInterface[]| string>=>{
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

export const login = async ({ email, password }: LoginInterface): Promise<UserInteface|null> => {
    try {
        const response: AxiosResponse<UserInteface> = await axios.post('http://localhost:5000/api/auth', { email, password });
        console.log(response.status);

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
            console.error("Error fetching top collections:", error);
            return null
        }
    }
};
