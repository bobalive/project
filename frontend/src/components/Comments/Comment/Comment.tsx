import {CommentInterface} from "./Comment.interface.ts";
import {NavLink} from "react-router-dom";

export const Comment =({userName,content,date,_id}:CommentInterface)=>{
    return (
        <div className="space-y-4 border p-3 my-5" key={_id&& _id}>
            <NavLink to ={`/user/${_id}`} className="text-sm font-medium">{userName}</NavLink>
            <p className="text-xs text-gray-500">{content}</p>
            <p className="text-xs text-gray-500">{date?date:''}</p>
        </div>
    )
}