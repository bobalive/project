const Router = require('express');
const SearchRouter = new Router()
const SearchController = require('../Contolers/SearchControler')

SearchRouter.get('/:q',SearchController.search)
SearchRouter.get('/complete/:q',SearchController.nameAutoComplete)
SearchRouter.get('/tags/top' ,SearchController.topTags)
SearchRouter.get('/tags/find/:q' ,SearchController.searchTags)

module.exports= SearchRouter