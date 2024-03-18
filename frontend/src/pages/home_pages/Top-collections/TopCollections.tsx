import {TableMenu} from "../../../components/Table/TableMenu.tsx";
import {useEffect} from "react";
import {getTopCollections} from "../../../api/collection.api.ts";
import {setCollection} from "../../../Store/Slices/collectionSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {StoreInterface} from "../../../interfaces/Store.interface.ts";


export const TopCollections = ()=>{
    const topCollections = useSelector((state:StoreInterface) => state.collections.topCollections)
    const dispatch = useDispatch()
    useEffect(() => {
            const getCollections = async ()=>{
                const topCollections = await getTopCollections()
                dispatch(setCollection(topCollections))
            }
            getCollections()

    }, []);
    return(
        <>
            {topCollections.length==0||(topCollections.length>0&&topCollections[0]._id != '0')?
                <TableMenu collection={topCollections}/>
                :"Loading ..."
            }


        </>
    )
}