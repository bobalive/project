import {CollectionInterface} from "../../interfaces/Collection.interface.ts";
import {ItemInterface} from "../../interfaces/Item.interface.ts";
import {Dispatch, SetStateAction} from "react";
import {CustomFiedInteface} from "../../interfaces/CustomFied.inteface.ts";

export interface TableInterface {
    collection?:CollectionInterface[];
    item?:ItemInterface[]
    custom_fields?:CustomFiedInteface
    id?:string[]
    setId?:Dispatch<SetStateAction<string[]>>

}