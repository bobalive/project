import axios from "axios";


export const search = async(query:string)=>{
    const res =await axios.get(import.meta.env.VITE_API+'/api/search/'+query)
    if(res.status===200){
        return res.data
    }
    return 'nothing found'
}
export const autocomplete = async(query:string)=>{
    const res = await axios.get(import.meta.env.VITE_API+'/api/search/complete/'+query)
    if(res.status===200){
        return res.data
    }
    return 'nothing found'
}