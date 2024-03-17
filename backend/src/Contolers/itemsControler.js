const Collections = require("../db/Collections")
const Item = require('../db/item')

class ItemsControler{
    async getItems(req,res){
        const {id}  = req.param
        try{
            const items = await Item.find({collectionId:id})
            res.status(200).json(items)
        }catch (e){
            res.status(400).json(e)
        }

    }
    async createItem(req, res){
        const item  = req.body 
        if(item){
            try{
                const newItem = await Item.create({...req.body})
                const Collection = await Collections.findOneAndUpdate(
                    { _id: item.collectionId }, // filter: find the document by its _id
                    { $push: { items: value } }, // update: push the value into the arrayField
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
        
        console.log(newItem);
        collection.items = collection.items.map(item =>{
            if(item._id == newItem._id){
                return {...newItem}
            }
            return item
        })

        collection.save()
        res.status(200).json(collection)
    }

}

module.exports = new ItemsControler()