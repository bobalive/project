import {NavLink, useNavigate} from "react-router-dom";
import {ArrowLeftIcon, Edit, MoreVerticalIcon} from "lucide-react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "../ui/dropdown-menu.tsx";

interface NavigationIntrface{
    collectionId?:string
    itemId?:string
}
export const Navigation = ({collectionId , itemId}:NavigationIntrface)=>{
    const navigate = useNavigate()
    return (
        <div className="flex items-center justify-between mb-6">
            <NavLink to={collectionId?'/collection/' + collectionId:'/'} className="flex items-center">
                <ArrowLeftIcon className="mr-2"/>
                Back{"\n     "}
            </NavLink>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <MoreVerticalIcon className=""/>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem className='text-lg gap-1'
                                      onClick={() => navigate(itemId?`/edit-item/${collectionId}/${itemId}`:`/edit-collection/${collectionId}`)}>
                        <Edit/>
                        Edit
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}