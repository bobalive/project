import {DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator} from "../ui/dropdown-menu.tsx";
import {ProfileInterface} from "./Profile.interface.ts";

export const Profile = ({name , email,id}:ProfileInterface)=>{
    const handleClick = () => {
        console.log(id)
    }
    return(
        <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>

            <DropdownMenuSeparator />
            <DropdownMenuItem>{name}</DropdownMenuItem>
            <DropdownMenuItem>{email}</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleClick}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
    )
}