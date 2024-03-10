import {UserInteface} from "./User.inteface.ts";
import {CollectionInterface} from "./Collection.interface.ts";

export interface StoreInterface{
    user?:UserInteface,
    collections:{
        topCollections:CollectionInterface[],
        myCollections?:CollectionInterface[]
    }
}