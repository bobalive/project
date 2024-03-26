const Router = require('express');
const UserRouter = require('./UserRouter');
const CollectionRouter = require('./CollectionRouter');
const itemsRouter = require('./ItemsRouter');
const SearchRouter = require('../router/SearchRoute')
const search = require('../Contolers/SearchControler')
const router = new Router()

router.use('/',UserRouter)
router.use('/collections',CollectionRouter )
router.use('/item' , itemsRouter)

router.use('/search' , SearchRouter)
module.exports = router;