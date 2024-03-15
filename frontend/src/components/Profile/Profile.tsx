import { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator} from "../ui/dropdown-menu.tsx";
import {ProfileInterface} from "./Profile.interface.ts";
import {logout} from "../../api/api.ts";
import {useDispatch} from "react-redux";
import {putUser} from "../../Store/Slices/userSlice.ts";

export const Profile = ({name , email}:ProfileInterface)=>{
    const dispatch = useDispatch()
    const handleClick = async () => {
        const isLogout = await logout()
        console.log(isLogout)
        if(isLogout){
            dispatch(putUser({name:'',email:'',id:'0',password:'',status:'blocked',role:'user'}))
        }
    }
    return(
        <>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>{name}</DropdownMenuItem>
            <DropdownMenuItem>{email}</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleClick}>Logout</DropdownMenuItem>

        </>

    )
}