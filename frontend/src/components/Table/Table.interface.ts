import {CollectionInterface} from "../../interfaces/Collection.interface.ts";
import {ItemInterface} from "../../interfaces/Item.interface.ts";

export interface TableInterface {
    collection?:CollectionInterface[];
    item?:ItemInterface[]

}