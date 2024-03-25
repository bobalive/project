import {Sidebar} from "../components/Sidebar/Sidebar.tsx";
import {Header} from "../components/Header/Header.tsx";
import {useEffect } from 'react'
import { getUser} from "../api/user.api.ts";
import {useDispatch} from "react-redux";
import {putUser} from "../Store/Slices/userSlice.ts";
import {Route, Routes} from "react-router";
import {Collection} from "./home_pages/Collection/Collection.tsx";
import {TopCollections} from "./home_pages/Top-collections/TopCollections.tsx";
import {TagCloud} from "./home_pages/Tag-cloud/Tag-cloud.tsx";
import {MyCollections} from "./home_pages/MyCollections/MyCollections.tsx";
import {Item} from "./home_pages/Item/Item.tsx";
import {LatestItems} from "./home_pages/LatestItems/LatestItems.tsx";
import {Admin} from "./home_pages/Admin/Admin.tsx";

export const Home = ()=> {
    const dispatch = useDispatch()
    const checkUser = async () => {
        const user = await getUser()
        if(user){
            dispatch(putUser({...user[0]}))
        }
    }
    useEffect(() => {
        checkUser()
    }, []);

    return (
        <div className="grid min-h-screen items-start w-full gap-4 lg:grid-cols-[280px_1fr] bg-gray-95  0 p-3 ">
            <div className=" hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
               <Sidebar/>
            </div>
            <div className="flex flex-col">
                    <Header/>
                <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 max-w-5xl  ">
                    <Routes>
                        <Route path={'/'} element={<TopCollections/>}/>
                        <Route path={'/tag-cloud'} element={<TagCloud/>}/>
                        <Route path={"/recent-items"} element={<LatestItems/>}/>
                        <Route path={'collection/:id'} element={<Collection/>}></Route>
                        <Route path={'my-collections/'} element={<MyCollections/>}></Route>
                        <Route path={'user/:id'} element={<MyCollections/>}/>
                        <Route path={'item/:id'} element={<Item/>}></Route>
                        <Route path={'admin/'} element={<Admin/>}/>
                    </Routes>

                </main>
            </div>
        </div>
    )
}









