import {Trash} from "lucide-react";
import {FieldValueInterface} from "./FieldValue.interface.ts";


export const FieldValue = ({item,name,i,handleDelete ,handleChange}:FieldValueInterface) => {
    return (
        <div className='flex items-center gap-2'>
            <h4 className="w-[80px] text-center">{name}:</h4>
            <input value={item} onChange={(e)=>handleChange(name,i,e.target.value)} className="border text-black border-gray-100 flex align-middle justify-center rounded-xl min-w-[100px] p-1"/>
            <Trash className='cursor-pointer hover:text-red-500' onClick={()=>handleDelete(name,i)}/>
        </div>
    )

}