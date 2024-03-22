import {CustomFiedNameInteface} from "../../interfaces/CustomFied.inteface.ts";
import {Dispatch, SetStateAction} from "react";

export interface CustomFieldsTableInterface{
    _id?:string
    customField:CustomFiedNameInteface
    setCustomField:Dispatch<SetStateAction<CustomFiedNameInteface>>
}