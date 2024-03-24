import {useDispatch, useSelector} from "react-redux";
import {StoreInterface} from "../../../interfaces/Store.interface.ts";
import {useEffect, useState} from "react";
import {deleteColections, getMyColletion} from "../../../api/collection.api.ts";
import {setMyCollection} from "../../../Store/Slices/collectionSlice.ts";
import {TableMenu} from "../../../components/Table/TableMenu.tsx";
import {Button} from "../../../components/ui/button.tsx";
import {useNavigate} from "react-router-dom";
import { Trash} from "lucide-react";
import {PlusIcon} from "../../../helpers/Icons/PlusIcon.tsx";

export const MyCollections = ()=>{
    const myCollections= useSelector((state:StoreInterface) => state.collections.myCollections);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [id , setId]= useState<string[]>([])
    const getCollection = async ()=>{
        const collections=await getMyColletion()
        console.log(collections)
        if(collections){
            dispatch(setMyCollection([...collections]))
        }
    }
    const handleDeleteCollection  = async ()=>{
        const res = await deleteColections(id)
        if(res){
            getCollection()
            setId([])
        }
    }
    useEffect(() => {
        getCollection()
    }, []);

    return(
        <>
            <div className="flex justify-between">
                <h1 className="text-3xl font-bold tracking-tight my-1.5">My Collections:</h1>
                <div className='flex gap-1'>
                    <Button onClick={handleDeleteCollection} size='lg'>
                        <Trash/>
                    </Button>
                    <Button onClick={() => navigate('/add-collection')} size='lg'>
                        <PlusIcon/>
                    </Button>
                </div>
            </div>
            {myCollections
                ? <TableMenu collection={[...myCollections]} id={id}
                             setId={setId}/>
                : 'loading'
            }
        </>
    )
}