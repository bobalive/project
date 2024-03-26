const Comments = require('../db/Comments')
const Items = require('../db/item')
const Collections = require('../db/Collections')
class SearchControler {

    async search (req, res){
        function makePipeline(index , q){
            return [{
                $search: {
                    index: index,
                    text: {
                        query: q,
                        path: {
                            wildcard: "*"
                        },
                        fuzzy: {}
                    }
                }
            }]
        }
        const {q} = req.params
        const itemId = []
        const pipeline = makePipeline('searchItem',q)
        const pipelineComments = makePipeline('commentSearch', q)

        const result = await Items.aggregate(pipeline).limit(10)
        const commentsResult = await Comments.aggregate(pipelineComments).limit(10)

        commentsResult.forEach(item=>{
            itemId.push(item.itemId)
        })

        const additionalResults = await Items.find({_id:{$in:itemId}})

        res.status(200).json([...result,...additionalResults])
    }
    async nameAutoComplete (req,res){
        function makePipeline(index , q){
            return [{
                $search: {
                    index: index,
                    text: {
                        query: q,
                        path:['name','tags','comments'],
                        fuzzy: {}
                    }
                }
            }]
        }
        const {q} = req.params
        const pipline = makePipeline('autocompete',q)
        const autocompeted = await Items.aggregate(pipline).limit(10)

        const response = autocompeted.map(item=>({
            _id:item._id,
            name:item.name,
            tags:item.tags
        }))

        res.status(200).json(response)
    }


}
module.exports = new SearchControler()