import { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator} from "../ui/dropdown-menu.tsx";
import {ProfileInterface} from "./Profile.interface.ts";
import {logout} from "../../api/user.api.ts";
import {useDispatch} from "react-redux";
import {putUser} from "../../Store/Slices/userSlice.ts";
import {setMyCollection} from "../../Store/Slices/collectionSlice.ts";
import {useTranslation} from "react-i18next";

export const Profile = ({name , email}:ProfileInterface)=>{
    const dispatch = useDispatch()
    const handleClick = async () => {
        const isLogout = await logout()
        console.log(isLogout)
        if(isLogout){
            dispatch(putUser({name:'',email:'',_id:'0',password:'',status:'blocked',role:'user'}))
            dispatch(setMyCollection([]))
        }
    }
    const {t} = useTranslation()
    return(
        <>
            <DropdownMenuLabel>{t('myAccount')}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>{name}</DropdownMenuItem>
            <DropdownMenuItem>{email}</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleClick}>Logout</DropdownMenuItem>

        </>

    )
}