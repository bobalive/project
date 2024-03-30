import {FieldValue} from "./FieldValue/FieldValue.tsx";
import {CustomFieldsTableInterface} from "./CustomFieldsTable.interface.ts";
import {deleteCustomField} from "../../api/collection.api.ts";
import {useTranslation} from "react-i18next";
import {nameType} from "./FieldValue/FieldValue.interface.ts";

export const CustomFieldsTable = ({customField,setCustomField,_id}:CustomFieldsTableInterface)=>{

    const {t} = useTranslation()
    const fields:nameType[] = ['custom_string',"custom_int","custom_boolean","custom_date","custom_multi_line"]
    const handleDelete  = (name:nameType, item:number)=>{
        setCustomField((prevState) => {
            prevState[name] = prevState[name].filter((_value,i) => i != item)
            return {...prevState}
        })
        if(_id){
            deleteCustomField(_id ,item ,name)
        }
    }
    const handleChange = (name:nameType ,index:number,  newValue:string)=>{
        setCustomField((prevState) => {
            prevState[name][index] = newValue

            return {...prevState}
        })
    }
    return(
        <>
            <h1 className="text-xl">{t('addCollection.customFields')}:</h1>
            <div className="flex justify-between flex-col gap-4">
                {fields.map((field)=>(
                    customField[field].map((item, i) => (
                    <FieldValue item={item} i={i} name={field} handleDelete={handleDelete} handleChange = {handleChange}/>
                )
                    )))}


            </div>
        </>
    )
}