const Collections = require("../db/Collections")
const Item = require('../db/item')
const {resetWatchers} = require("nodemon/lib/monitor/watch");

class ItemsControler{
    async getItems(req,res){
        const { id } = req.params;
        try{
            const items = await Item.find({collectionId:id})
            res.status(200).json(items.reverse())
        }catch (e){
            res.status(400).json(e)
        }
    }
    async sortItem(req, res) {
        const { collectionId, sort, dir , index} = req.query;
        const direction = dir === 'asc' ? 1 : -1
        try {
            if(index >=0){
                const indexNumeric = parseInt(index);
                console.log(indexNumeric)
                const items = await Item.aggregate([
                    {
                        $match: { collectionId: collectionId }
                    },
                    {
                        $addFields: {
                            custom_string: { $arrayElemAt: [sort, indexNumeric] }
                        }
                    },
                    {
                        $sort: { custom_string: direction }
                    }
                ]).exec();
                console.log(items)

                res.json(items);
            } else {
                let sortObject = {};
                sortObject[sort] = direction;
                const items = await Item.find({ collectionId: collectionId }).sort(sortObject);
                res.json(items);
            }

        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
    async createItem(req, res){
        const {item} = req.body
        if(item){
            try{
                const newItem = await Item.create({...item ,tags :item.tags.sort() })

                const Collection = await Collections.findOneAndUpdate(
                    { _id: item.collectionId }, // filter: find the document by its _id
                    { $push: { items: newItem._id } }, // update: push the value into the arrayField
                    { returnOriginal: false } // options: return the updated document, not the original
                )


                return res.status(200).json(newItem)
            }catch (e){
                return res.status(500).json(e)
            }

        }
        return res.status(400).json("no data")
        
    }
    async changeItem(req,res){
        const item = req.body

        const collection = await Item.findOneAndUpdate({_id:item._id} ,{...item , usrId:req.user[0]._id},{returnOriginal:false})

        res.status(200).json(collection)
    }
    async deleteItem(req,res){
        const {id, collectionId} = req.body
        try{
            const collection = await Item.deleteMany({_id:{$in:id}},)
            const result = await Collections.updateMany(
                { _id:collectionId},
                { $pull: { items: { $in: id } } }
            );
            res.status(200).json(collection)
        }catch (e){
            res.status(400).json(e)
        }
    }
    async getItem(req,res){
        const {id}= req.params

        try{
            const newCollections = await Item.find({_id: id})

            res.status(200).json(newCollections[0])
        }catch (e){
            res.status(400).json(e)
        }
    }
    async getLatesItem(req,res){
        try{
            const latestItem=  await Item.find().sort({ timestampField: -1 }).limit(5)
            res.status(200).json(latestItem)
        }catch (e){
            res.status(400).json(e)
        }
    }
    async setLikes(req,res){
        const {id,likes} = req.body
        try{
            const newItem = await Item.findOneAndUpdate({_id:id} ,{likes: likes},{new:true})
            console.log(newItem)
            res.status(200).json(newItem)
        }catch (e){
            res.status(400).json(e)
        }
    }


}

module.exports = new ItemsControler()