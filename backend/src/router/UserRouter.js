const Router = require('express');
const UserControlers = require('../Contolers/UserControlers');
const verifyToken = require('../middleware/Middleware')
const UserRouter = new Router()

UserRouter.get('/',UserControlers.users)
UserRouter.post('/signin', UserControlers.createUsers);
UserRouter.post('/auth' , UserControlers.login)
UserRouter.put('/block' ,verifyToken,UserControlers.block)
UserRouter.delete('/delete/:id' ,verifyToken, UserControlers.delete)


module.exports = UserRouter;