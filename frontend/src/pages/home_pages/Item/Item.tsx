import {NavLink, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getItem, getСollectionInfo} from "../../../api/items.api.ts";
import {CustomFiedNameInteface} from "../../../interfaces/CustomFied.inteface.ts";
import {ItemInterface} from "../../../interfaces/Item.interface.ts";

import {Button} from "../../../components/ui/button.tsx";
import {Input} from "../../../components/ui/input.tsx";
import {ArrowLeftIcon, HeartIcon,  MoreVerticalIcon, ShareIcon} from "lucide-react";
import {Comment} from "../../../components/Comment/Comment.tsx";
import {CustomFields} from "../../../components/CustomFields/CustomField.tsx";
import {useSelector} from "react-redux";
import {StoreInterface} from "../../../interfaces/Store.interface.ts";



export const Item = () => {

    const {id} = useParams<string>()
    const {id:userId , name} = useSelector((state:StoreInterface) => state.user)

    const [item , setItem] = useState<ItemInterface>()
    const [custfields ,setCustField ] = useState<CustomFiedNameInteface|undefined>()
    const [userName , setUser ] = useState<string>()
    const [collectionName , setCollectionName] = useState<string>()

    const [comment , setComment] = useState('')
    const [userComments , setUserComments ] = useState<CommentInterface[]>([])

    const [ws , setWs] = useState<WebSocket>()


    useEffect( () => {
        const ws = new WebSocket('ws://localhost:3000')
        const GetComments:GetComments = {
            itemId:id,
            action:'getComments'
        }
        ws.onopen = ()=> ws.send(JSON.stringify(GetComments))
        ws.onclose = ()=>  console.log('DISCONNECTED')
        ws.onmessage = (ev:any) => {
            const comments = JSON.parse(ev.data)
            console.log()
            if(comments.length <= 1){
                setUserComments(prev => [...comments , ...prev])
            }else{
                setUserComments([...comments])
            }

        };
        setWs(ws)

        if(id){
            getСollectionInfo(id).then((res) => {
                setCustField(res?.custom_fields)
                setUser(res?.userName)
                setCollectionName(res?.collectionName)
            })
            getItem(id).then(res=>{
                setItem(res)
            })
        }
        return ()=>{
            ws.close()
        }

    }, []);

    const handeComments =  (e:any)=>{
        e.preventDefault()
        setComment('')
        if(item?.collectionId && id){
            const data:SendCommentInterface = {
                action:'setComment',
                comment:{
                    userName:name,
                    collectionId:item?.collectionId,
                    userId:userId,
                    content:comment,
                    itemId:id,
                }
            }
            ws?.send(JSON.stringify(data))
        }
    }
    return (
        <>

        {item?._id
            ? <div className="w-full mx-auto p-2">
                <div className="flex items-center justify-between mb-6">
                    <NavLink to={'/collection/' + item?.collectionId} className="flex items-center">
                        <ArrowLeftIcon className="mr-2"/>
                        Back{"\n          "}
                    </NavLink>
                    <div className="flex items-center space-x-4">
                        <HeartIcon className=""/>
                        <ShareIcon className=""/>
                        <MoreVerticalIcon className=""/>
                    </div>
                </div>
                <div className="mb-6">
                    <h1 className="text-2xl font-bold">Item "{item.name}"</h1>
                    <p className="text-sm text-gray-600">#id "{item._id}"</p>
                    <NavLink to={'/'} className="text-sm text-gray-600">of collection "{collectionName}"</NavLink>
                    <p className="text-sm text-gray-600">Author: "{userName}"</p>
                </div>
                <div className="mb-6 flex items-center gap-1">
                    <h2 className="text-lg font-semibold">Tags:</h2>
                    <div className="flex space-x-2">
                        <Button className="text-sm" variant="ghost">
                            #books
                        </Button>
                        <Button className="text-sm" variant="ghost">
                            #leisure
                        </Button>
                    </div>
                </div>

                <div className='flex gap-2 flex-wrap'>


                {
                    item.custom_fields.custom_string.map((field, i) => (
                        <CustomFields field={field} fieldName={custfields?.custom_string[i]}></CustomFields>
                    ))
                }
                {
                    item.custom_fields.custom_int.map((field, i) => (
                        <CustomFields field={field} fieldName={custfields?.custom_int[i]}></CustomFields>
                    ))
                }
                {
                    item.custom_fields.custom_boolean.map((field, i) => (
                        <CustomFields field={field} fieldName={custfields?.custom_boolean[i]}></CustomFields>
                    ))
                }
                {
                    item.custom_fields.custom_date.map((field, i) => (
                        <CustomFields field={field} fieldName={custfields?.custom_date[i]}></CustomFields>
                    ))
                }

                </div>
                {
                    item.custom_fields.custom_multi_line.map((field, i) => (
                        <div className="mb-6 flex flex-col  ">
                            <h2 className="text-2xl font-semibold mx-2 mb-4 w-[300px]">{custfields?.custom_multi_line[i]}: </h2>
                            <div className="prose prose-gray max-w-none not-italic border p-2 rounded-md">
                                <p className="text-sm block">
                                    {field}
                                </p>
                            </div>


                        </div>
                    ))
                }


                <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">Comments</h2>

                        <form onSubmit={handeComments} className="flex items-center space-x-2 mb-4">
                            <Input className="flex-1" placeholder="Add comment..." value={comment} onChange={(e)=>setComment(e.target.value)}/>
                            <Button variant="secondary">Send</Button>
                        </form>


                    {
                        userComments?.map(item=>{
                           return <Comment date={item.date} userName={item.userName} userId={item.userId} _id={item._id} content={item.content} />
                        })
                    }

                </div>
            </div>
            :
            "loading..."

        }

        </>

    )

}