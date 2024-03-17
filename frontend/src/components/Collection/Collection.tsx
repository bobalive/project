import {useNavigate, useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import { CollectionInterface } from "../../interfaces/Collection.interface.ts";
import { getOneCollection } from "../../api/collection.api.ts";

import {TableMenu} from "../Table/TableMenu.tsx";
import {Button} from "../ui/button.tsx";
import {Trash} from "lucide-react";
import {PlusIcon} from "../../helpers/Icons/PlusIcon.tsx";


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
        <>
        {collection ? (<>
                <img
                    alt="Item preview"
                    className="w-full h-auto w-[200px]"

                    src={collection[0].photo}
                    style={{
                        aspectRatio: "200/200",
                        objectFit: "cover",
                    }}

                />
                <h1 className="text-3xl font-bold tracking-tight my-1.5">Title :{collection[0].name}</h1>
                <p className="text-gray-500 dark:text-gray-400">Description:{collection[0].description}</p>
                <p className="text-gray-500 dark:text-gray-400">UserId: {collection[0].userId}</p>
                <div className="flex justify-between">
                    <h2 className="text-2xl font-bold tracking-tight my-1.5">Items:</h2>
                    <div className='flex gap-1'>
                        <Button size='lg'>
                            <Trash/>
                        </Button>
                        <Button size='lg'>
                            <PlusIcon/>
                        </Button>
                    </div>
                </div>

                {<TableMenu item={collection[0].items}></TableMenu>}
            </>
        ) : (
            "Loading..."
        )}
        </>
    );

};
