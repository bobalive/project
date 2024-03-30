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
                        path: ['name'],
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
    async topTags(req,res){
        try {
            const topTags = await Items.aggregate([
                { $unwind: "$tags" }, // Unwind the tags array
                { $group: { _id: "$tags", count: { $sum: 1 } } }, // Group by tags and count occurrences
                { $sort: { count: -1 } }, // Sort in descending order of count
                { $limit: 20 } // Limit to top 20
            ]);

            res.json(topTags);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    async searchTags(req,res){
        const {q} = req.params
        try{
            const tags = await Items.aggregate([
                {
                    $search: {
                        index: 'autocompete',
                        text: {
                            query: q,
                            path:['tags'],
                            fuzzy: {}
                        }
                    }
                },
                {
                    $limit: 10 // Set the limit to 10 documents
                }
            ]).then(res => res.map(item => item.tags).flat());
            const uniqueTags = [...new Set(tags)];

            res.status(200).json(uniqueTags);

        }catch (e){
            console.error(e);
            res.status(500).json({ message: 'Internal server error' });
        }
    }


}
module.exports = new SearchControler()