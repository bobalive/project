import {CustomFiedInteface} from "./CustomFied.inteface.ts";


export interface ItemInterface  extends  SendItemInterface{
    _id:string
}


export interface SendItemInterface {
    collectionId: string;
    userId?: string;
    name: string;
    tags:string[];
    custom_fields:CustomFiedInteface
}

export interface DeleteItemsInterface {
    id:string[]
    collectionId:string
}
