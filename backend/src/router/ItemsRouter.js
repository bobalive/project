const Router = require('express');
const verifyToken = require('../middleware/Middleware');
const itemsControler = require('../Contolers/itemsControler');
const itemsRouter = new Router()

itemsRouter.post('/create' , itemsControler.createItem)
itemsRouter.post('/edit' ,verifyToken, itemsControler.changeItem)

module.exports = itemsRouter