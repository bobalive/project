const Collections = require("../db/Collections")

class ItemsControler{
    async createItem(req, res){
        const item  = req.body 
        if(item){
            try{
                const newCollection = await Collections.findOne({_id:item.collectionId})
                newCollection.items.push({...item})
                newCollection.save()
                return res.status(200).json(newCollection)
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