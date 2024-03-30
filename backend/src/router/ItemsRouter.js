const Router = require('express');
const verifyToken = require('../middleware/Middleware');
const itemsControler = require('../Contolers/itemsControler');
const itemsRouter = new Router()

itemsRouter.get('/getCollections/:id',itemsControler.getItems)
itemsRouter.get('/getItem/:id', itemsControler.getItem)
itemsRouter.get('/latestItems', itemsControler.getLatesItem)
itemsRouter.get('/sort' , itemsControler.sortItem)

itemsRouter.post('/create' ,verifyToken, itemsControler.createItem)
itemsRouter.post('/edit' ,verifyToken, itemsControler.changeItem)
itemsRouter.post('/setLikes' , verifyToken ,itemsControler.setLikes)
itemsRouter.delete('/delete/' , verifyToken , itemsControler.deleteItem)


module.exports = itemsRouter
