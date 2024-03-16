import {UserInteface} from "./User.interface.ts";
import {CollectionInterface} from "./Collection.interface.ts";

export interface StoreInterface{
    user:UserInteface,
    collections:{
        topCollections:CollectionInterface[],
        myCollections:CollectionInterface[]
    },
    activeTab:{active:number}
}