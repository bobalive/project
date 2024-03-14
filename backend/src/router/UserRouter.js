const Router = require('express');
const UserControlers = require('../Contolers/UserControlers');
const verifyToken = require('../middleware/Middleware')
const UserRouter = new Router()

UserRouter.get('/users',UserControlers.users)
UserRouter.get('/', UserControlers.getUser)
UserRouter.get("/logout" , UserControlers.logout)
UserRouter.post('/signin', UserControlers.createUsers);
UserRouter.post('/auth' , UserControlers.login)
UserRouter.put('/block' ,verifyToken,UserControlers.block)
UserRouter.delete('/delete/:id' ,verifyToken, UserControlers.delete)


module.exports = UserRouter;