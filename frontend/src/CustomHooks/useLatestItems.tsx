import {useEffect, useState} from "react";
import {getLatestItems} from "../api/items.api.ts";
import {ItemInterface} from "../interfaces/Item.interface.ts";

export const useLatestItems = ()=>{
    const [item, setItem]= useState<ItemInterface[]>()
    useEffect(() => {
        getLatestItems().then(res=>{
            setItem(res)
        })
    }, []);
    return item
}