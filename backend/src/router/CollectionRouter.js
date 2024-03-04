const Router = require('express');
const CollectionControler = require('../Contolers/CollectionControler');
const verifyToken = require('../middleware/Middleware')
const CollectionRouter = new Router()

CollectionRouter.post("/create", CollectionControler.createCollections)



module.exports = CollectionRouter;