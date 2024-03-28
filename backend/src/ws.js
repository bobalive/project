const WebSocket = require('ws');
const Comment = require("./db/Comments");
const moment = require("moment");
const CLientMap = new Map()
const wsConnect =  (ws,req)=>{
        const sendComments = (itemId = '', comments,action) => {
            const clients = CLientMap.get(itemId);
            if (clients) {
                clients.forEach(client => {
                    client.send(JSON.stringify({comments, action}));
                });
            }
        };

        ws.on('message' , async (message)=>{
            const data = JSON.parse(message)

            if(data.action == 'setComment'){

                const currentDate = moment()
                const comments = await Comment.create({...data.comment,date:currentDate.format('yyyy-MM-dd HH:mm:ss')})
                sendComments(data.comment.itemId, [comments] ,'setComment' )

            }
            if(data.action == 'getComments'){
                if(!CLientMap.has(data.itemId)){
                    CLientMap.set(data.itemId , new Set)
                    CLientMap.get(data.itemId).add(ws)
                }else if(!CLientMap.get(data.itemId).has(ws)){
                    CLientMap.get(data.itemId).add(ws)
                }


                const comments = await Comment.find({itemId:data.itemId})
                const reversedComments = comments.reverse();
                sendComments(data.itemId, reversedComments , 'getComments')

            }

        })

        ws.on('close' ,()=>{
            CLientMap.forEach((clients, itemId) => {
                if (clients.has(ws)) {
                    clients.delete(ws);
                }
            });
        })

}
module.exports  = wsConnect
