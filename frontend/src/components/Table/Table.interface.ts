import {CollectionInterface} from "../../interfaces/Collection.interface.ts";
import {ItemInterface} from "../../interfaces/Item.interface.ts";
import {Dispatch, SetStateAction} from "react";

export interface TableInterface {
    collection?:CollectionInterface[];
    item?:ItemInterface[]
    selectedCollections?:string[]
    setSelectedCollections?:Dispatch<SetStateAction<string[]>>

}