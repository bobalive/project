const Router = require('express');
const UserRouter = require('./UserRouter');
const CollectionRouter = require('./CollectionRouter');
const itemsControler = require('../Contolers/itemsControler');
const itemsRouter = require('./ItemsRouter');
const router = new Router()

router.use('/',UserRouter)
router.use('/collections',CollectionRouter )
router.use('/item' , itemsRouter)

module.exports = router;