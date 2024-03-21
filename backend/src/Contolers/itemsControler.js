const Collections = require("../db/Collections")
const Item = require('../db/item')

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
        const id = req.user._id
        item.tags = item.tags.join(' ')

        if(item){
            try{
                const newItem = await Item.create({...item , userId:id})

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
        const {collectionId, item:newItem } = req.body
        const collection = await Collections.findOne({_id:collectionId})

        collection.items = collection.items.map(item =>{
            if(item._id == newItem._id){
                return {...newItem}
            }
            return item
        })

        collection.save()
        res.status(200).json(collection)
    }
    async deleteItem(req,res){
        const {id, collectionId} = req.body
        console.log(req.body)
        try{
            const collection = await Item.deleteMany({_id:{$in:id}},)
            const result = await Collections.updateMany(
                { _id:collectionId},
                { $pull: { items: { $in: id } } }
            );


            console.log(collection)
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

}

module.exports = new ItemsControler()