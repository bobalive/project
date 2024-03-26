import axios from "axios";


export const search = async(query:string)=>{
    const res =await axios.get('http://localhost:5000/api/search/'+query)
    if(res.status===200){
        return res.data
    }
    return 'nothing found'
}
export const autocomplete = async(query:string)=>{
    const res = await axios.get('http://localhost:5000/api/search/complete/'+query)
    if(res.status===200){
        return res.data
    }
    return 'nothing found'
}