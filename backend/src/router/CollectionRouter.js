const Router = require('express');
const CollectionControler = require('../Contolers/CollectionControler');
const verifyToken = require('../middleware/Middleware')
const CollectionRouter = new Router()

CollectionRouter.post("/edit" , verifyToken , CollectionControler.editCollection)
CollectionRouter.get("/my-collection" , verifyToken , CollectionControler.getUserCollection)
CollectionRouter.get("/collection/:id" , CollectionControler.getOneCollection)
CollectionRouter.get("/user/:id" , verifyToken, CollectionControler.getAllCollections)
CollectionRouter.post("/change",verifyToken, CollectionControler.addFields)
CollectionRouter.post("/create", verifyToken,CollectionControler.createCollections)
CollectionRouter.get('/top' , CollectionControler.getTopCollections)



module.exports = CollectionRouter;