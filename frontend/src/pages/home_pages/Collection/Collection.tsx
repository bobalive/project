import {NavLink, useNavigate, useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import { CollectionInterface } from "../../../interfaces/Collection.interface.ts";
import { getOneCollection } from "../../../api/collection.api.ts";

import {TableMenu} from "../../../components/Table/TableMenu.tsx";
import {Button} from "../../../components/ui/button.tsx";
import {ArrowLeftIcon, Trash} from "lucide-react";
import {PlusIcon} from "../../../helpers/Icons/PlusIcon.tsx";
import {ItemInterface} from "../../../interfaces/Item.interface.ts";
import {deleteItems, getItems} from "../../../api/items.api.ts";


export const Collection = () => {
    const { id } = useParams<{ id: string }>();
    const [collection, setCollection] = useState<CollectionInterface[] | null>(null);
    const [items , setItems] = useState<ItemInterface[]|null>()
    const [ids, setIds] = useState<string[]>([])
    const naviagte = useNavigate()
    const getCollection = async () => {
        try {
            if (id) {
                const newCollection = await getOneCollection(id);
                const items = await getItems(id)
                console.log(items)
                setCollection(newCollection);
                setItems(items)
            }else{
                naviagte('/')
            }
        } catch (error) {
            console.error("Error fetching collection:", error);
        }
    };

    useEffect(() => {


        getCollection();
    }, [id]);

    const handleDelete = async (e:any)=>{
        e.preventDefault()
        if(collection){
            const newItem= await deleteItems({id:ids , collectionId:collection[0]._id})
            if(newItem){
                getCollection()
            }


        }

    }


    return (
        <>
        {collection && items? (<>
                <NavLink to={'/'} className="flex items-center" >
                    <ArrowLeftIcon className="mr-2"/>
                    Back{"\n          "}
                </NavLink>
                <img
                    alt="Item preview"
                    className="h-auto w-[200px]"

                    src={collection[0].photo? collection[0].photo:'/vite.svg'}
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
                        <Button size='lg'onClick={handleDelete}>
                            <Trash/>
                        </Button>
                        <Button size='lg' onClick={()=> {
                            naviagte('/add-item/' + id)
                        }}>
                            <PlusIcon/>
                        </Button>
                    </div>
                </div>

                {<TableMenu item={items} id={ids} setId={setIds} custom_fields={collection[0].custom_fields}></TableMenu>}
            </>
        ) : (
            "Loading..."
        )}
        </>
    );

};
