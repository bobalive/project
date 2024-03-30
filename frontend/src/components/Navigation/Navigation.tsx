import {NavLink, useNavigate} from "react-router-dom";
import {ArrowLeftIcon, Edit, HeartIcon, MoreVerticalIcon} from "lucide-react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "../ui/dropdown-menu.tsx";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {StoreInterface} from "../../interfaces/Store.interface.ts";
import {UserInteface} from "../../interfaces/User.interface.ts";
import {Dispatch, SetStateAction} from "react";
import {sendLikes} from "../../api/items.api.ts";

interface NavigationIntrface{
    collectionId?:string
    itemId?:string,
    userId?:string,
    likes?:string[],
    setLikes?:Dispatch<SetStateAction<string[]>>
}
export const Navigation = ({collectionId , itemId, userId,likes,setLikes}:NavigationIntrface)=>{
    const navigate = useNavigate()

    const {t} = useTranslation()
    const user= useSelector<StoreInterface,UserInteface>(store => store.user)
    const handleClick = (itemId:string,setLikes:Dispatch<SetStateAction<string[]>>)=>{
        setLikes((prev)=> {
            let next
            if(prev.includes(user._id)){
                next=prev.filter(id => id!=user._id)
            }else{
                next = [...prev , user._id]
            }
            sendLikes(itemId, next)
            return next
        })
    }

    return (
        <div className="flex items-center justify-between mb-6">
            <NavLink to={itemId?'/collection/' + collectionId: '/user/'+userId} className="flex items-center">
                <ArrowLeftIcon className="mr-2"/>
                {t('navigation.back')}{"\n     "}
            </NavLink>
            <div className='flex gap-5 items-start justify-center'>
                {
                    itemId && setLikes &&
                    <div >
                        <HeartIcon
                            className={'cursor-pointer '+ (likes?.includes(user._id)&& 'text-red-500 fill-red-500')}
                            onClick={ ()=>handleClick(itemId,setLikes)}
                        />
                        <span className='text-center block'> {likes?.length}</span>
                    </div>

                }

            {(user._id == userId || user.role == 'admin') &&<DropdownMenu>
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
            </div>
    )
}