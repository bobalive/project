import {useDispatch, useSelector} from "react-redux";
import {StoreInterface} from "../../interfaces/Store.interface.ts";
import {useEffect, useState} from "react";
import {deleteColections, getMyColletion} from "../../api/api.ts";
import {setMyCollection} from "../../Store/Slices/collectionSlice.ts";
import {TableMenu} from "../Table/TableMenu.tsx";
import {Button} from "../ui/button.tsx";
import { useNavigate} from "react-router-dom";
import {Trash} from "lucide-react";
import {PlusIcon} from "../../helpers/Icons/PlusIcon.tsx";


export const MyCollections = ()=>{
    const myCollections= useSelector((state:StoreInterface) => state.collections.myCollections);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [selectedCollections , setSelectedCollections]= useState<string[]>([])
    const getCollection = async ()=>{
        const collections=await getMyColletion()
        if(collections){
            dispatch(setMyCollection([...collections]))
        }
    }
    const handleDeleteCollection  = async ()=>{

        const res = await deleteColections(selectedCollections)

        if(res){
            dispatch(setMyCollection(res))
            setSelectedCollections([])
        }


    }
    useEffect(() => {
        getCollection()
    }, []);

    return(
        <>
            <div className="flex justify-between">

                <h1 className="text-3xl font-bold tracking-tight my-1.5">My Collections:</h1>
                <img width='200' height='500'
                     src=" https://www.dropbox.com/scl/fi/eani41vl6btoysnxyz5ie/undefinedphoto_2024-03-10_02-04-21.jpg?rlkey=7udixhhb7tfs1hwcq4ao7rqj4&raw=1"/>
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
                ? <TableMenu collection={[...myCollections]} selectedCollections={selectedCollections}
                             setSelectedCollections={setSelectedCollections}/>
                : 'loading'
            }
        </>
    )
}