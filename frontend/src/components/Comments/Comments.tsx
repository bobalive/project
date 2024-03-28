import {Input} from "../ui/input.tsx";
import {Button} from "../ui/button.tsx";
import {Comment} from "./Comment/Comment.tsx";
import {useEffect, useState} from "react";
import {ItemInterface} from "../../interfaces/Item.interface.ts";
import {useDispatch, useSelector} from "react-redux";
import {StoreInterface} from "../../interfaces/Store.interface.ts";
import {useWs} from "../../CustomHooks/useWs.tsx";
import {useTranslation} from "react-i18next";
import {AppDispatch} from "../../interfaces/User.interface.ts";
import {auth} from "../../Store/Slices/userSlice.ts";


interface Comments {
    item: ItemInterface
}

export const Comments = ({item}: Comments) => {
    const [comment, setComment] = useState('')

    const {_id: userId, name} = useSelector((state: StoreInterface) => state.user)
    const {ws, userComments} = useWs({id: item?._id})
    const {t} = useTranslation()
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        dispatch(auth())
    }, []);

    const handeComments = async (e: any) => {
        dispatch(auth())
        e.preventDefault()
        setComment('')
        if (item?.collectionId && item?._id && comment && userId) {
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
            <h2 className="text-lg font-semibold mb-2">{t('comment.commentsTitle')}</h2>
            {userId&& <form onSubmit={(e) => handeComments(e)} className="flex items-center space-x-2 mb-4">
                <Input className="flex-1" placeholder={t('comment.addCommentPlaceholder')} value={comment}
                       onChange={(e) => setComment(e.target.value)}/>
                <Button variant="secondary">{t('comment.sendButton')}</Button>
            </form>}
            {userComments?.map((comment) => (
                <Comment key={comment._id} date={comment.date} userName={comment.userName} userId={comment.userId} _id={comment._id} content={comment.content} />
            ))}
        </div>
    );
}