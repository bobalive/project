import {useEffect, useState} from "react";
import {getLatestItems} from "../api/items.api.ts";
import {ItemInterface} from "../interfaces/Item.interface.ts";
import {search} from "../api/search.api.ts";

export const useLatestItems = (query:string|undefined)=>{
    const [item, setItem]= useState<ItemInterface[]>()
    useEffect(() => {
        if(query){
            search(query).then(res=>{
                setItem(res)
            })
        }else{
            getLatestItems().then(res=>{
                setItem(res)
            })
        }

    }, [query]);
    return item
}