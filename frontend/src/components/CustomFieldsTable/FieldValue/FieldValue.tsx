import {Trash} from "lucide-react";
import {FieldValueInterface} from "./FieldValue.interface.ts";


export const FieldValue = ({item,name,i,handleDelete}:FieldValueInterface) => {

    return (
        <div className='flex items-center gap-2'>
            <h4 className="w-[80px] text-center">{name}:</h4>
            <div className="border border-gray-100 flex align-middle justify-center rounded-xl min-w-[100px] p-1">{item} </div>
            <Trash className='cursor-pointer hover:text-red-500' onClick={()=>handleDelete(name,i)}/>
        </div>

    )

}