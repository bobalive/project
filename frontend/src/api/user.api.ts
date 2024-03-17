import axios, { AxiosResponse } from 'axios';
import {UserInteface} from "../interfaces/User.interface.ts";
import {LoginInterface, SigninInterface} from "../interfaces/Login.interface.ts";







export const login = async ({ email, password }: LoginInterface): Promise<UserInteface[]|null|undefined> => {
    try {
        const response: AxiosResponse<UserInteface[]> = await axios.post('http://localhost:5000/api/auth', { email, password },{
            withCredentials:true
        });
        console.log(response);


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




