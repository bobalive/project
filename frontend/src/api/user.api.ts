import axios, { AxiosResponse } from 'axios';
import {UserInteface} from "../interfaces/User.interface.ts";
import {LoginInterface, SigninInterface} from "../interfaces/Login.interface.ts";
import {ChangeUserRole, ChangeUserStatus} from "../interfaces/ChangeUserState.ts";







export const login = async ({ email, password }: LoginInterface): Promise<UserInteface[]|null|undefined> => {
    try {
        const response: AxiosResponse<UserInteface[]> = await axios.post(import.meta.env.VITE_API+'/api/auth', { email, password },{
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
        const response:AxiosResponse<UserInteface> = await axios.post(import.meta.env.VITE_API+'/api/signin' ,{name,password , email},{
            withCredentials:true
        })
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
        const response:AxiosResponse<UserInteface[]> = await axios.get(import.meta.env.VITE_API+'/api/',{
            withCredentials:true
        })
        return response.data
    }catch (e){
        return null
    }
}

export const logout = async ()=>{
    const response = await axios.get(import.meta.env.VITE_API+'/api/logout',{
        withCredentials:true
    })
    if(response.status == 200){
        return true;
    }
}
export const getUsers = async ()=>{
    try{
        const response: AxiosResponse<UserInteface[]> = await axios.get(import.meta.env.VITE_API + '/api/users', {
            withCredentials: true
        })
        if (response.status === 200) {
            return response.data
        }
    }catch (e){
        console.log(e)
        return []
    }
}
export const changeUserState = async ({ids,status}:ChangeUserStatus)=>{
    try{
        const response = await axios.put(import.meta.env.VITE_API + '/api/change-status', {ids, status},
            {
                withCredentials: true
            }
        )
        if (response.status === 200) {
            return response.data
        }
    }catch (e){
        console.log(e)
        return []
    }
}
export const changeRole = async ({ids,role}:ChangeUserRole)=>{
    try{
        const response = await axios.put(import.meta.env.VITE_API + '/api/change-role', {ids, role}, {
            withCredentials: true
        })
        if (response.status === 200) {
            return response.data
        }
    }catch (e){
        console.log(e)
        return []
    }
}
export const deleteUsers = async (ids:string[])=>{
    try{
        const response = await axios.delete(import.meta.env.VITE_API + '/api/delete', {
            data: {
                ids
            },
            withCredentials: true
        })
        if (response.status === 200) {
            return response.data
        }
    }catch (e){
        console.log(e)
        return []
    }
}
export const checkIsAuth = async ()=>{
    const response:AxiosResponse<UserInteface> = await axios.get(import.meta.env.VITE_API+'/api/isAuth',{
        withCredentials:true
    });
    if(response.status ==200){
        return response.data;
    }
}




