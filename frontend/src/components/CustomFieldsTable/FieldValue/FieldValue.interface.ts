export interface FieldValueInterface{
    item:string
    name:nameType,
    i:number
    handleDelete:(name:nameType, item:number)=>void
    handleChange:(name: nameType, index: number, newValue: string)=>void
}
export type nameType = "custom_string"|"custom_int"|'custom_boolean'|'custom_date'|'custom_multi_line'
