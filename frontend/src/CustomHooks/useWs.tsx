import { useEffect, useState} from "react";


interface useWsInterface {
    id?:string
}
export const useWs = ({id}:useWsInterface)=>{
    const [ws , setWs] = useState<WebSocket>()
    const [userComments , setUserComments] = useState<CommentInterface[]>([])

    useEffect(() => {
        const ws = new WebSocket('wss://'+import.meta.env.VITE_WS)
        const GetComments:GetComments = {
            itemId:id,
            action:'getComments'
        }
        ws.onopen = ()=> ws.send(JSON.stringify(GetComments))
        ws.onclose = ()=>  console.log('DISCONNECTED')
        ws.onmessage = (ev:any) => {

            const {comments,action} = JSON.parse(ev.data)
            console.log(comments)

            if(action==='setComment'){
                setUserComments(prev => [...comments , ...prev])
            }else{
                setUserComments([...comments])
            }
        };
        setWs(ws)
        return () => {
            ws.close();
            setUserComments([])
        }
    }, [id]);

    return {ws,userComments}
}