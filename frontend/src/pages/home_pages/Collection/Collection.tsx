import {NavLink, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import { useTranslation } from "react-i18next";
import { CollectionInterface } from "../../../interfaces/Collection.interface.ts";
import { getOneCollection } from "../../../api/collection.api.ts";

import { TableMenu } from "../../../components/Table/TableMenu.tsx";
import { Button } from "../../../components/ui/button.tsx";
import { FilterIcon, Trash} from "lucide-react";
import { PlusIcon } from "../../../helpers/Icons/PlusIcon.tsx";
import { ItemInterface } from "../../../interfaces/Item.interface.ts";
import { deleteItems, getItems } from "../../../api/items.api.ts";

import { Navigation } from "../../../components/Navigation/Navigation.tsx";
import {useDispatch, useSelector} from "react-redux";
import {StoreInterface} from "../../../interfaces/Store.interface.ts";
import {AppDispatch, UserInteface} from "../../../interfaces/User.interface.ts";
import {auth} from "../../../Store/Slices/userSlice.ts";
import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from "../../../components/ui/dropdown-menu.tsx";
import CreatableSelect from "react-select/creatable";
import {useOptions} from "../../../CustomHooks/useOptions.tsx";
import {MultiValue} from "react-select";

export const Collection = () => {
    const { t } = useTranslation();
    const { id } = useParams<{ id: string }>();
    const user = useSelector<StoreInterface,UserInteface>(state => state.user)
    const dispatch = useDispatch<AppDispatch>()

    const [collection, setCollection] = useState<CollectionInterface[] | null>(null);
    const [items, setItems] = useState<ItemInterface[] | null>()

    const [initialItems , setInitialItems] = useState<ItemInterface[] | null>()

    const [ids, setIds] = useState<string[]>([])

    const [tags,setTags]= useState<MultiValue<{value: string;label: string; }>>()
    const [selectValue , setSlectValue] = useState<string>('')

    const options = useOptions(selectValue)
    const navigate = useNavigate();
    const handleSelectChange = (e: MultiValue<{ value: string; label: string }>) => {
        setTags(
            e.map(item => {
                if (!item.value.includes('#')) {
                    return ({
                        value: "#" + item.value,
                        label: "#" + item.label
                    });
                }
                return item;
            })
        );
    };
    const getCollection = async () => {
        try {
            if (id) {
                const newCollection = await getOneCollection(id);
                const items = await getItems(id);
                setInitialItems(items)
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
    const handleFilter = ()=>{
        setItems((prevState) => {
            if(tags && tags.length > 0 ){
                const tagsValues:string[] = tags?.map((tags=> tags.value))
                prevState = initialItems?.filter(item => {
                    let flag = false
                    tagsValues.forEach(tag=>{
                        if(item.tags.includes(tag)) {
                            flag = true
                        }
                    })
                    return flag
                })
            }else{
                prevState = initialItems
            }
            return prevState
        })
    }

    return (
        <>
            {collection && collection.length > 0 && items ? (
                <>
                    <Navigation collectionId={collection[0]?._id} userId={collection[0]?.userId}/>
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
                    <p className="text-gray-500 dark:text-gray-400">{t('collection.description')} {collection[0].description}</p>
                    <NavLink to ={'/user/' + collection[0].userId} className="text-gray-500 dark:text-gray-400">{t('collection.user_id')} {collection[0].userId}</NavLink>
                    <div className="flex justify-between">
                        <h2 className="text-2xl font-bold tracking-tight my-1.5">{t('collection.items')}</h2>

                        <div className='flex'>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Button size='lg' className='mx-1'>
                                        <FilterIcon/>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent >
                                    <div className='w-[300px] h-[200px] p-1 relative'>
                                        <h3 className='text-xl mb-2'>Filter by tags</h3>
                                        <CreatableSelect
                                            value={tags}
                                            inputValue={selectValue}
                                            isMulti
                                            name="tags"
                                            options={options}
                                            onChange={handleSelectChange}
                                            onInputChange={(e)=> setSlectValue(e)}
                                            className="dark-multi-select text-black "
                                            classNamePrefix="select"
                                            required
                                        />
                                        <div className ='absolute bottom-0 right-0 flex justify-between w-full'>
                                            <Button variant='secondary'
                                            onClick={handleFilter}

                                            >Apply filter</Button>
                                            <Button variant='destructive'
                                            onClick={()=>{
                                                setItems(initialItems)
                                                setTags([])
                                            }}
                                            >Cancel</Button>
                                        </div>

                                    </div>

                                </DropdownMenuContent>
                            </DropdownMenu>

                        {( user.role =='admin' || (user._id == collection[0].userId && user.status == 'active')) && <div className='flex gap-1'>
                            <Button size='lg'  onClick={handleDelete}>
                                <Trash/>
                            </Button>
                            <Button size='lg' onClick={() => navigate('/add-item/' + id)}>
                                <PlusIcon/>
                            </Button>
                        </div>}
                    </div>
                    </div>
                    {<TableMenu item={items} setItem={setItems} id={ids} setId={setIds} custom_fields={collection[0].custom_fields}></TableMenu>}
                </>
            ) : (
                t('collection.loading')
            )}
        </>
    );
};
