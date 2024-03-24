import axios, { AxiosResponse } from 'axios';
import {UserInteface} from "../interfaces/User.interface.ts";
import {LoginInterface, SigninInterface} from "../interfaces/Login.interface.ts";
import {ChangeUserRole, ChangeUserStatus} from "../interfaces/ChangeUserState.ts";







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
        const response:AxiosResponse<UserInteface> = await axios.post("http://localhost:5000/api/signin" ,{name,password , email},{
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
        const response = await axios.get('http://localhost:5000/api/',{
            withCredentials:true
        })
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
export const getUsers = async ()=>{
    const response:AxiosResponse<UserInteface[]>  = await axios.get('http://localhost:5000/api/users' , {
        withCredentials:true
    })
    if(response.status === 200){
        return response.data
    }
}
export const changeUserState = async ({ids,status}:ChangeUserStatus)=>{
    const response = await axios.put('http://localhost:5000/api/change-status' ,{ids, status},
        {
            withCredentials:true
        }
    )
    if(response.status=== 200){
        return response.data
    }
}
export const changeRole = async ({ids,role}:ChangeUserRole)=>{
    const response = await axios.put('http://localhost:5000/api/change-role',{ids,role},{
        withCredentials:true
    })
    if(response.status === 200){
        return response.data
    }
}
export const deleteUsers = async (ids:string[])=>{
    const response = await axios.delete('http://localhost:5000/api/delete' ,{
        data:{
            ids
        },
        withCredentials:true
    })
    if(response.status === 200){
        return response.data
    }
}



