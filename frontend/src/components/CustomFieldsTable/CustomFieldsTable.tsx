import {FieldValue} from "./FieldValue/FieldValue.tsx";
import {CustomFieldsTableInterface} from "./CustomFieldsTable.interface.ts";
import {deleteCustomField} from "../../api/collection.api.ts";
import {useTranslation} from "react-i18next";

export const CustomFieldsTable = ({customField,setCustomField,_id}:CustomFieldsTableInterface)=>{

    const {t} = useTranslation()
    const handleDelete  = (name:"String"|"Integer"|'Boolean'|'Date'|'Multiline', item:number)=>{

        let field = ''
        setCustomField(prevState => {
            switch (name){
                case "String":
                    field=  'custom_string'
                    prevState.custom_string = prevState.custom_string.filter((_value,i) => i != item)
                    break
                case "Integer":
                    field=  'custom_int'
                    prevState.custom_int = prevState.custom_int.filter((_value,i) => i != item)
                    break
                case "Boolean":
                    field=  'custom_boolean'
                    prevState.custom_boolean = prevState.custom_boolean.filter((_value,i) => i != item)
                    break
                case "Date":
                    field=  'custom_date'
                    prevState.custom_date = prevState.custom_date.filter((_value,i) => i != item)
                    break
                case "Multiline":
                    field=  'custom_multi_line'
                    prevState.custom_multi_line = prevState.custom_multi_line.filter((_value,i) => i != item)
                    break
            }
            return {...prevState}
        })

        if(_id){
            deleteCustomField(_id ,item ,field).then(res =>{
                console.log(res)
            })
        }

    }
    return(
        <>
            <h1 className="text-xl">{t('addCollection.customFields')}:</h1>
            <div className="flex justify-between flex-col gap-4">
                {customField.custom_string.map((item, i) => (
                    <FieldValue item={item} i={i} name={'String'} handleDelete={handleDelete}/>
                ))}
                {customField.custom_int.map((item, i) => (
                    <FieldValue item={item} i={i} name={'Integer'} handleDelete={handleDelete}/>

                ))}
                {customField.custom_boolean.map((item, i) => (
                    <FieldValue item={item} i={i} name={'Boolean'} handleDelete={handleDelete}/>
                ))}
                {customField.custom_date.map((item, i) => (
                    <FieldValue item={item} i={i} name={'Date'} handleDelete={handleDelete}/>
                ))}
                {customField.custom_multi_line.map((item, i) => (
                    <FieldValue item={item} i={i} name={'Multiline'} handleDelete={handleDelete}/>
                ))}

            </div>
        </>
    )
}