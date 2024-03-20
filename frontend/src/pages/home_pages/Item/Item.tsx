import {NavLink, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getCustomCollections, getItem} from "../../../api/items.api.ts";
import {CustomFiedNameInteface} from "../../../interfaces/CustomFied.inteface.ts";
import {ItemInterface} from "../../../interfaces/Item.interface.ts";

import {Button} from "../../../components/ui/button.tsx";
import {Input} from "../../../components/ui/input.tsx";
import {ArrowLeftIcon, Check, HeartIcon, Minus, MoreVerticalIcon, ShareIcon} from "lucide-react";


export const Item = () => {

    const {id} = useParams<string>()
    const [item , setItem] = useState<ItemInterface>()
    const [custfields ,setCustField ] = useState<CustomFiedNameInteface>()

    useEffect( () => {
        if(id){
            getCustomCollections(id).then(res => {
                setCustField(res)
            })
            getItem(id).then(res=>{

                setItem(res)
            })
        }

    }, []);


    return (
        <>

        {item?._id
            ? <div className="w-full mx-auto p-2">
                <div className="flex items-center justify-between mb-6">
                    <NavLink to={'/collection/' + item?.collectionId} className="flex items-center" >
                        <ArrowLeftIcon className="mr-2"/>
                        Back{"\n          "}
                    </NavLink>
                    <div className="flex items-center space-x-4">
                        <HeartIcon className=""/>
                        <ShareIcon className=""/>
                        <MoreVerticalIcon className=""/>
                    </div>
                </div>
                <div className="mb-6">
                    <h1 className="text-2xl font-bold">Item "{item.name}"</h1>
                    <p className="text-sm text-gray-600">#id "{item._id}"</p>
                    <p className="text-sm text-gray-600">of collection "Name" by "Author"</p>
                    <p className="text-sm text-gray-600">Author: "Author"</p>
                    <p className="text-sm text-gray-600">Release Date: 1980</p>
                </div>


                {
                    item.custom_fields.custom_string.map((field, i) => (
                        <div className="mb-6 flex items-center ">
                            <h2 className="text-lg font-semibold mx-2 w-[150px]">{custfields?.custom_string[i]}: </h2>
                            <Button className="text-sm w-[150px] text-start hover:bg-gray-950" variant="outline">
                                {field}
                            </Button>

                        </div>
                    ))
                }
                {
                    item.custom_fields.custom_int.map((field, i) => (
                        <div className="mb-6 flex items-center ">
                            <h2 className="text-lg font-semibold  mx-2 w-[150px]">{custfields?.custom_int[i]}: </h2>
                            <Button className="text-sm w-[150px] text-start hover:bg-gray-950" variant="outline">
                                {field}
                            </Button>

                        </div>
                    ))
                }
                {
                    item.custom_fields.custom_boolean.map((field, i) => (
                        <div className="mb-6 flex items-center ">
                            <h2 className="text-lg font-semibold  mx-2 w-[150px]">{custfields?.custom_boolean[i]}: </h2>
                            {(!field)
                                ?  <Minus className='border '></Minus>
                                :  <Check className='border '></Check>
                            }

                        </div>
                    ))
                }
                {
                    item.custom_fields.custom_date.map((field, i) => (
                        <div className="mb-6 flex items-center ">
                            <h2 className="text-lg font-semibold  mx-2 w-[150px]">{custfields?.custom_date[i]}: </h2>
                            <Button className="text-sm w-[150px] text-start hover:bg-gray-950" variant="outline">
                                {field}
                            </Button>

                        </div>
                    ))
                }
                {
                    item.custom_fields.custom_multi_line.map((field, i) => (
                        <div className="mb-6 flex flex-col  ">
                            <h2 className="text-2xl font-semibold mx-2 mb-4 w-[300px]">{custfields?.custom_multi_line[i]}: </h2>
                            <div className="prose prose-gray max-w-none not-italic border p-2 rounded-md">
                                <p className="text-sm block">
                                    {field}
                                </p>
                            </div>


                        </div>
                    ))
                }

                <div className="mb-6">
                    <h2 className="text-lg font-semibold">Tags:</h2>
                    <div className="flex space-x-2">
                        <Button className="text-sm" variant="ghost">
                            #books
                        </Button>
                        <Button className="text-sm" variant="ghost">
                            #leisure
                        </Button>
                    </div>
                </div>


                <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">Comments</h2>
                    <div className="flex items-center space-x-2 mb-4">
                        <Input className="flex-1" placeholder="Add comment..."/>
                        <Button variant="secondary">Send</Button>
                    </div>
                    <div className="space-y-4">
                        <p className="text-sm font-medium">user_name</p>
                        <p className="text-xs text-gray-500">Wow!</p>
                        <p className="text-xs text-gray-500">02.01.1980, 19:48</p>
                    </div>
                </div>
            </div>
            :
            "loading..."

        }

        </>

    )

}