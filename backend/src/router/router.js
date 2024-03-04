const Router = require('express');
const UserControlers = require('../Contolers/UserControlers');
const verifyToken = require('../middleware/Middleware');
const UserRouter = require('./UserRouter');
const CollectionRouter = require('./CollectionRouter');
const router = new Router()

router.use('/',UserRouter)
router.use('/collections',CollectionRouter )

module.exports = router;