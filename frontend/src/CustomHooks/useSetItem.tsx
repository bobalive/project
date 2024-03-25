import {useEffect, useState} from "react";
import {ItemInterface} from "../interfaces/Item.interface.ts";
import {getItem} from "../api/items.api.ts";

export const useSetItem= (itemId?:string)=>{
    const [item , setItem] = useState<ItemInterface>()

    useEffect(() => {
        if(itemId){
            getItem(itemId).then(res=>{
                setItem(res)
            })
        }

    }, []);
    return item
}