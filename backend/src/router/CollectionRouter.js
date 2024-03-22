const Router = require('express');
const CollectionControler = require('../Contolers/CollectionControler');
const verifyToken = require('../middleware/Middleware')
const CollectionRouter = new Router()


CollectionRouter.get('/top' , CollectionControler.getTopCollections)
CollectionRouter.get("/my-collection" , verifyToken , CollectionControler.getUserCollection)
CollectionRouter.get("/collection/:id" , CollectionControler.getOneCollection)
CollectionRouter.get("/user/:id" , verifyToken, CollectionControler.getAllCollections)
CollectionRouter.get('/customFields/:id' , CollectionControler.getCustomFields)

CollectionRouter.post("/edit" , verifyToken , CollectionControler.editCollection)
CollectionRouter.post("/change",verifyToken, CollectionControler.addFields)
CollectionRouter.post("/create",verifyToken,CollectionControler.createCollections)

CollectionRouter.delete('/delete' , verifyToken , CollectionControler.deleteCollection)
CollectionRouter.delete('/customFields/delete' ,CollectionControler.deleteCustomFields)




module.exports = CollectionRouter;