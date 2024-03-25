import {NavLink, useNavigate} from "react-router-dom";
import {ArrowLeftIcon, Edit, MoreVerticalIcon} from "lucide-react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "../ui/dropdown-menu.tsx";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {StoreInterface} from "../../interfaces/Store.interface.ts";

interface NavigationIntrface{
    collectionId?:string
    itemId?:string,
    userId?:string
}
export const Navigation = ({collectionId , itemId, userId}:NavigationIntrface)=>{
    const navigate = useNavigate()
    const {t} = useTranslation()
    const user = useSelector<StoreInterface>(store => store.user._id)
    return (
        <div className="flex items-center justify-between mb-6">
            <NavLink to={itemId?'/collection/' + collectionId: '/'} className="flex items-center">
                <ArrowLeftIcon className="mr-2"/>
                {t('navigation.back')}{"\n     "}
            </NavLink>
            {user == userId&&<DropdownMenu>
                <DropdownMenuTrigger>
                    <MoreVerticalIcon className=""/>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem className='text-lg gap-1'
                                      onClick={() => navigate(itemId ? `/edit-item/${collectionId}/${itemId}` : `/edit-collection/${collectionId}`)}>
                        <Edit/>
                        {t('navigation.edit')}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>}
        </div>
    )
}