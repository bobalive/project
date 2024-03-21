interface CommentInterface  {
    _id?:string
    date?:  string;
    userId: string;
    userName: string;
    collectionId: string;
    itemId: string;
    content: string;
}
interface SendCommentInterface{
    action:'setComment'
    comment:CommentInterface
}
interface GetComments{
    action:'getComments',
    itemId?:string
}
