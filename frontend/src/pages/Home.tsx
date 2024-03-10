import {Sidebar} from "../components/Sidebar/Sidebar.tsx";
import {TableMenu} from "../components/Table/TableMenu.tsx";
import {Header} from "../components/Header/Header.tsx";
import {useEffect } from 'react'
import {getTopCollections} from "../api/api.ts";
import {useDispatch, useSelector} from "react-redux";
import {StoreInterface} from "../interfaces/store.interface.ts";
import {setCollection} from "../Store/collectionSlice.ts";
export const Home = ()=> {
    const topCollections = useSelector((state:StoreInterface) => state.collections.topCollections)
    const dispatch = useDispatch()

    useEffect(() => {
        const getCollections = async ()=>{
            const topCollections = await getTopCollections()
            dispatch(setCollection(topCollections))
        }
        getCollections()
    }, []);
    return (
        <div className="grid min-h-screen items-start w-full gap-4 lg:grid-cols-[280px_1fr] bg-black p-3">
            <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
               <Sidebar/>
            </div>
            <div className="flex flex-col">
                    <Header/>
                <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                    <TableMenu collection={topCollections}/>
                </main>
            </div>
        </div>
    )
}









