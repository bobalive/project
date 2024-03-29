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
    async createItem(req, res){

        const {item} = req.body
        const {_id, name} = req.user[0]

        if(item){
            try{
                const newItem = await Item.create({...item , userId:_id , userName:name })


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
            const latestCollections =  await Item.find().sort({ timestampField: -1 }).limit(5)
            res.status(200).json(latestCollections)
        }catch (e){
            res.status(400).json(e)
        }
    }


}

module.exports = new ItemsControler()