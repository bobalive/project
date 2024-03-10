import { Header } from "../components/Header/Header.tsx";
import {useNavigate, useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import { CollectionInterface } from "../interfaces/Collection.interface.ts";
import { getOneCollection } from "../api/api.ts";
import {Sidebar} from "../components/Sidebar/Sidebar.tsx";
import {TableMenu} from "../components/Table/TableMenu.tsx";


export const Collection = () => {
    const { id } = useParams<{ id: string }>();
    const [collection, setCollection] = useState<CollectionInterface[] | null>(null);
    const naviagte = useNavigate()


    useEffect(() => {
        const getCollection = async () => {
            try {
                if (id) {
                    const newCollection = await getOneCollection(id);
                    setCollection(newCollection);
                }else{
                    naviagte('/')
                }
            } catch (error) {
                console.error("Error fetching collection:", error);
            }
        };

        getCollection();
    }, [id]);


    return (
        <div className="grid min-h-screen items-start w-full gap-4 lg:grid-cols-[280px_1fr] bg-gray-400 p-3">
            <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
                <Sidebar/>
            </div>

            <div className="flex flex-col">

                <Header/>



                {collection ? (<>
                        <h1 className="text-3xl font-bold tracking-tight my-1.5">{collection[0].name}</h1>
                        <p className="text-gray-500 dark:text-gray-400">{collection[0].description}</p>

                        <TableMenu item={collection[0].items}></TableMenu>
                    </>
                ) : (
                    "Loading..."
                )}
            </div>
        </div>
            );

};
