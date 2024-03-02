const Router = require('express');
const UserControlers = require('../Contolers/UserControlers');
const verifyToken = require('../middleware/Middleware')
const router = new Router()

router.get('/',verifyToken,UserControlers.users)
router.post('/signin', UserControlers.createUsers);
router.post('/auth' , UserControlers.login)
router.put('/block' ,verifyToken,UserControlers.block)
router.delete('/delete/:id' ,verifyToken, UserControlers.delete)


module.exports = router;