import {useEffect, useState} from "react";
import {getTopTags} from "../api/search.api.ts";

interface topTags {
    _id:string,
    count:number
}
export const useTopTags = ()=>{
    const [topTags, setTopTags] = useState<topTags[]>()

    useEffect(() => {
        getTopTags().then(res=>{
            setTopTags(res)
        })
    }, []);

    return topTags
}