import {CollectionInterface} from "../../interfaces/Collection.interface.ts";
import {ItemInterface} from "../../interfaces/Item.interface.ts";
import {Dispatch, SetStateAction} from "react";
import {CustomFiedNameInteface} from "../../interfaces/CustomFied.inteface.ts";

export interface TableInterface {
    collection?:CollectionInterface[];
    item?:ItemInterface[]
    custom_fields?:CustomFiedNameInteface
    id?:string[]
    setId?:Dispatch<SetStateAction<string[]>>
    setItem?:Dispatch<SetStateAction<ItemInterface[] | null | undefined>>

}