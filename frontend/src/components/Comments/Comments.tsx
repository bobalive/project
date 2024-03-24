import {Input} from "../ui/input.tsx";
import {Button} from "../ui/button.tsx";
import {Comment} from "../Comment/Comment.tsx";
import {useState} from "react";
import {ItemInterface} from "../../interfaces/Item.interface.ts";
import {useSelector} from "react-redux";
import {StoreInterface} from "../../interfaces/Store.interface.ts";
import {useWs} from "../../CustomHooks/UseWs.tsx";


interface Comments {
    item: ItemInterface
}

export const Comments = ({item}: Comments) => {
    const [comment, setComment] = useState('')

    const {_id: userId, name} = useSelector((state: StoreInterface) => state.user)
    const {ws, userComments} = useWs({id: item?._id})

    const handeComments = (e: any) => {
        e.preventDefault()

        setComment('')
        if (item?.collectionId && item?._id && comment) {
            const data: SendCommentInterface = {
                action: 'setComment',
                comment: {
                    userName: name,
                    collectionId: item?.collectionId,
                    userId: userId,
                    content: comment,
                    itemId: item?._id,
                }
            }
            ws?.send(JSON.stringify(data))
        }
    }
    return (
        <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Comments</h2>
            <form onSubmit={(e) => handeComments(e)} className="flex items-center space-x-2 mb-4">
                <Input className="flex-1" placeholder="Add comment..." value={comment}
                       onChange={(e) => setComment(e.target.value)}/>
                <Button variant="secondary">Send</Button>
            </form>

            {userComments?.map(item => {
                return <Comment date={item.date} userName={item.userName} userId={item.userId} _id={item._id}
                                content={item.content}/>
            })
            }

        </div>
    )
}