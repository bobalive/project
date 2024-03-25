import {CustomFiedInteface} from "./CustomFied.inteface.ts";


export interface ItemInterface  extends  SendItemInterface{
    _id:string
    userName:string
}
export interface SendItemInterface {
    collectionId: string;
    usrId?: string;
    name: string;
    tags:string[];
    custom_fields:CustomFiedInteface;
    collectionName:string

}

export interface DeleteItemsInterface {
    id:string[]
    collectionId:string
}
