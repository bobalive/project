import {useDispatch, useSelector} from "react-redux";
import {StoreInterface} from "../../interfaces/Store.interface.ts";
import {useEffect} from "react";
import {getMyColletion} from "../../api/api.ts";
import {setMyCollection} from "../../Store/Slices/collectionSlice.ts";
import {TableMenu} from "../Table/TableMenu.tsx";
import {Button} from "../ui/button.tsx";
import { useNavigate} from "react-router-dom";


export const MyCollections = ()=>{
    const myCollections= useSelector((state:StoreInterface) => state.collections.myCollections);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const getCollection = async ()=>{
        const collections=await getMyColletion()
        if(collections){
            dispatch(setMyCollection([...collections]))
        }
    }
    useEffect(() => {
        getCollection()
    }, []);
    console.log('bob')

    return(
        <>
            <div className="flex justify-between">

                <h1 className="text-3xl font-bold tracking-tight my-1.5">My Collections:</h1>
                <Button onClick={()=>navigate('/add-collection')} size='lg'>
                    Add collection
                </Button>
            </div>

            {myCollections
                ? <TableMenu collection={[...myCollections]}/>
                : 'loading'
            }
        </>
    )
}