const Router = require('express');
const SearchRouter = new Router()
const SearchController = require('../Contolers/SearchControler')

SearchRouter.get('/:q',SearchController.search)
SearchRouter.get('/complete/:q',SearchController.nameAutoComplete)

module.exports= SearchRouter