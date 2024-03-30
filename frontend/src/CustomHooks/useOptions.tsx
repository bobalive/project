import {useEffect, useState} from "react";
import {MultiValue} from "react-select";
import {searchTags} from "../api/search.api.ts";

export const useOptions = (selectValue:string)=>{
    const [options , setOptions] = useState<MultiValue<{     value: string;     label: string; }>>()
    useEffect(()=>{
        const timeOut = setTimeout(()=>{
            searchTags(selectValue).then(res=>{
                setOptions(res.map((tag:string )=>({
                    value:tag,
                    label:tag
                })))
            })
        },1000)
        return ()=>{
            clearTimeout(timeOut)
        }
    },[selectValue])
    return options
}