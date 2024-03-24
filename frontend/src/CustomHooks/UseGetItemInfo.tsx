import {useEffect, useState} from "react";
import {CustomFiedNameInteface} from "../interfaces/CustomFied.inteface.ts";
import {getСollectionInfo} from "../api/items.api.ts";

interface itemInfoInterface {
    custFields?:CustomFiedNameInteface
    collectionName:string,
    userName:string
}
const infoInitial:itemInfoInterface ={
    userName:'',
    collectionName:'',
    custFields:{
        custom_multi_line:[],
        custom_date:[],
        custom_boolean:[],
        custom_string:[],
        custom_int:[]
    }
}
export const useGetItemInfo = (itemId?:string)=>{
    const [info, setInfo ] = useState<itemInfoInterface>(infoInitial);
    useEffect( () => {
        if(itemId){
            getСollectionInfo(itemId).then((res) => {
                if (res){
                    setInfo({
                        custFields:res.custom_fields,
                        collectionName:res.collectionName,
                        userName:res.userName
                    })
                }

            })
        }
    }, []);
    return info

}