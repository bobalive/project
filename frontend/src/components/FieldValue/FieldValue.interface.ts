export interface FieldValueInterface{
    item:string
    name:nameType,
    i:number
    handleDelete:(name:nameType,item:number)=>void
}
type nameType = "String"|"Integer"|'Boolean'|'Date'|'Multiline'
