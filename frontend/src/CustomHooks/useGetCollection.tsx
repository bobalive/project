import {useEffect, useState} from "react";
import {getOneCollection} from "../api/collection.api.ts";
import {CustomFiedNameInteface} from "../interfaces/CustomFied.inteface.ts";
import {CollectionInterface} from "../interfaces/Collection.interface.ts";
import {UseFormSetValue} from "react-hook-form";

interface UseGetCollectionInterface {
    setValue:UseFormSetValue<CollectionInterface>
    id?:string
}
export const useGetCollection = ({setValue,id}:UseGetCollectionInterface)=>{
    const [customField , setCustomField ] = useState<CustomFiedNameInteface>({
        custom_int:[],
        custom_boolean:[],
        custom_date:[],
        custom_string:[],
        custom_multi_line:[]
    })
    useEffect(() => {
        if(id){
            getOneCollection(id).then(res=>{
                setValue('name', res[0].name)
                setValue('description' , res[0].description)
                setValue('theme' , res[0].theme)
                setCustomField(res[0].custom_fields)
            })
        }
    }, []);
    const handleFieds = (field:string,inputValue:string)=>{
            switch (field){
                case 'string':
                    if(customField.custom_string.length<3 ){
                        setCustomField({...customField , custom_string:[...customField.custom_string , inputValue]})
                    }
                    break;
                case "int":
                    if(customField.custom_int.length<3 ) {
                        setCustomField({...customField, custom_int: [...customField.custom_int, inputValue]})
                    }
                    break;
                case "bool":
                    if(customField.custom_boolean.length<3 ) {
                        setCustomField({...customField , custom_boolean:[...customField.custom_boolean , inputValue]})
                    }
                    break;
                case "date":
                    if(customField.custom_date.length<3 ) {
                        setCustomField({...customField, custom_date: [...customField.custom_date, inputValue]})
                    }
                    break;
                case "multi_line":
                    if(customField.custom_multi_line.length<3 ) {
                        setCustomField({...customField, custom_multi_line: [...customField.custom_multi_line, inputValue]})
                    }
                    break;
                default:
                    break;
            }}

    return {customField,setCustomField,handleFieds}
}