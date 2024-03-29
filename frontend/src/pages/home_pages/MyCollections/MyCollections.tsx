import {useDispatch, useSelector} from "react-redux";
import {StoreInterface} from "../../../interfaces/Store.interface.ts";
import {useEffect, useState} from "react";
import {deleteColections, getMyColletion, getUserCollection} from "../../../api/collection.api.ts";
import {setMyCollection} from "../../../Store/Slices/collectionSlice.ts";
import {TableMenu} from "../../../components/Table/TableMenu.tsx";
import {Button} from "../../../components/ui/button.tsx";
import {useNavigate, useParams} from "react-router-dom";
import { Trash} from "lucide-react";
import {PlusIcon} from "../../../helpers/Icons/PlusIcon.tsx";
import {useTranslation} from "react-i18next";
import {auth} from "../../../Store/Slices/userSlice.ts";
import {AppDispatch} from "../../../interfaces/User.interface.ts";


export const MyCollections = ()=>{
    const {userId} = useParams()

    const {myCollections , user}= useSelector((state:StoreInterface) => ({
        myCollections:state.collections.myCollections,
        user:state.user
    }));
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const {t} = useTranslation()

    const [id , setId]= useState<string[]>([])
    const [userName , setUserName] = useState(t('my'))
    const getCollection = async ()=>{
        if(userId){
            const {collections,name} = await getUserCollection(userId)

            setUserName(name)
            if(collections){
                dispatch(setMyCollection([...collections]))
            }
        }else{
            const collections=await getMyColletion()
            setUserName(t('my'))
            if(collections){
                dispatch(setMyCollection([...collections]))
            }
        }
    }

    const handleDeleteCollection  = async ()=>{
        const ownerId = userId?userId:user._id
        await dispatch(auth())
        const res = await deleteColections(id,ownerId)
        if(res){
            getCollection()
            setId([])
        }
    }
    useEffect(() => {
        dispatch(auth())
        getCollection()
        if((user._id == '' || user.status == 'blocked') && !userId ){
            navigate('/')
        }
    }, [user,userId]);



    return(
        <>
            <div className="flex justify-between">
                <h1 className="text-3xl font-bold tracking-tight my-1.5">{userName +' '+ t('collections')}:</h1>
                {(userId == user._id || user.role ==='admin')&&
                    <div className='flex gap-1'>
                        <Button onClick={handleDeleteCollection} size='lg'>
                            <Trash/>
                        </Button>
                        <Button onClick={() => navigate('/add-collection/' + userId)} size='lg'>
                            <PlusIcon/>
                        </Button>
                    </div>
                }

            </div>
            {myCollections
                ? <TableMenu collection={[...myCollections]} id={id}
                             setId={setId}/>
                : 'loading'
            }
        </>
    )
}