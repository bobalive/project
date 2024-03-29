import {NavLink, useNavigate, useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CollectionInterface } from "../../../interfaces/Collection.interface.ts";
import { getOneCollection } from "../../../api/collection.api.ts";

import { TableMenu } from "../../../components/Table/TableMenu.tsx";
import { Button } from "../../../components/ui/button.tsx";
import { Trash } from "lucide-react";
import { PlusIcon } from "../../../helpers/Icons/PlusIcon.tsx";
import { ItemInterface } from "../../../interfaces/Item.interface.ts";
import { deleteItems, getItems } from "../../../api/items.api.ts";

import { Navigation } from "../../../components/Navigation/Navigation.tsx";
import {useDispatch, useSelector} from "react-redux";
import {StoreInterface} from "../../../interfaces/Store.interface.ts";
import {AppDispatch, UserInteface} from "../../../interfaces/User.interface.ts";
import {auth} from "../../../Store/Slices/userSlice.ts";

export const Collection = () => {
    const { t } = useTranslation();
    const { id } = useParams<{ id: string }>();
    const user = useSelector<StoreInterface,UserInteface>(state => state.user)
    const dispatch = useDispatch<AppDispatch>()

    const [collection, setCollection] = useState<CollectionInterface[] | null>(null);
    const [items, setItems] = useState<ItemInterface[] | null>()
    const [ids, setIds] = useState<string[]>([])

    const navigate = useNavigate();

    const getCollection = async () => {
        try {
            if (id) {
                const newCollection = await getOneCollection(id);
                const items = await getItems(id);
                setCollection(newCollection);
                setItems(items);
            } else {
                navigate('/');
            }
        } catch (error) {
            console.error("Error fetching collection:", error);
        }
    };


    useEffect(() => {
        dispatch(auth())
        getCollection();
    }, [id,user]);

    const handleDelete = async (e: any) => {
        await dispatch(auth())
        e.preventDefault();
        if (collection) {
            const newItem = await deleteItems({ id: ids, collectionId: collection[0]._id });
            if (newItem) {
                getCollection();
            }
        }
    };

    return (
        <>
            {collection && items ? (
                <>
                    <Navigation collectionId={collection[0]._id} userId={collection[0].userId}/>
                    <div className='flex justify-between items-start'>
                        <img
                            alt="Item preview"
                            className="h-auto w-[200px]"
                            src={collection[0].photo ? collection[0].photo : '/placeholder.png'}
                            style={{
                                aspectRatio: "200/200",
                                objectFit: "cover",
                            }}
                        />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight my-1.5">{t('collection.title')} {collection[0].name}</h1>
                    <p className="text-gray-500 dark:text-gray-400">{t('collection.description')}: {collection[0].description}</p>
                    <NavLink to ={'/user/' + collection[0].userId} className="text-gray-500 dark:text-gray-400">{t('collection.user_id')}: {collection[0].userId}</NavLink>
                    <div className="flex justify-between">
                        <h2 className="text-2xl font-bold tracking-tight my-1.5">{t('collection.items')}:</h2>
                        {( user.role =='admin' || (user._id == collection[0].userId && user.status == 'active')) && <div className='flex gap-1'>
                            <Button size='lg' onClick={handleDelete}>
                                <Trash/>
                            </Button>
                            <Button size='lg' onClick={() => navigate('/add-item/' + id)}>
                                <PlusIcon/>
                            </Button>
                        </div>}
                    </div>
                    {<TableMenu item={items} id={ids} setId={setIds} custom_fields={collection[0].custom_fields}></TableMenu>}
                </>
            ) : (
                t('collection.loading')
            )}
        </>
    );
};
