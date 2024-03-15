const Users = require("../db/Users")
const Collections = require('../db/Collections')

class CollectionControler{
    async getAllCollections(req,res){
        const { id } = req.params;

        if (id) {
            console.log(req.params);
            try {
                const collections = await Collections.find({ userId: id });
                return res.status(200).json(collections);
            } catch (e) {
                console.error(e); // Log the error for debugging purposes
                return res.status(500).send(e.message); // Send an error response
            }
        } else {
            return res.status(400).send("Missing 'id' parameter");
        }
        
    }
    async getTopCollections(req,res){
        try{
            let collections = await Collections.find()
            collections = collections.sort((a,b)=> b.items.length - a.items.length)
            return res.status(200).json(collections.filter((item, i)=> (item.items.length>0 && i< 5)))
        }catch (e){
            return res.status(400).json(e)
        }
    }
    async getOneCollection(req,res){
        const {id} = req.params
        if(id){
            try{
                const colletion = await Collections.find({_id:id})
                
               
                res.status(200).json(colletion)
            }catch(e){
                res.status(500)
            }
        }else{
            res.status(400).json("no id")
        }
    }
    async createCollections(req,res){
        try{

       
        const {id , collections} = req.body
        
        if(id && collections){
            const userCollections = await Collections.create({...collections , userId:id})
            
            return res.status(200).json(userCollections)
        }else{
            return res.status(400).json('incorrect data')
        }

        }catch{
            return res.status(500)
        }
    }
    async addFields(req,res){
        try{
           const {collection_id,data} = req.body
           if(collection_id && data){
            const collection = await Collections.findByIdAndUpdate(collection_id,{custom_Fields:{...data}})
            res.status(200).json(collection)
           }else{
            res.status(400).json('incorrect data')
           }

        }catch{
            res.status(500)
        }
    }
    async editCollection(req,res){

        const collection = req.body;
        const uId = req.user[0]._id;
          
        // if (collection.userId !== uId) {
        //     return res.status(400).json("access error");
        // }
        
        if (!collection) {
            return res.status(400).json('wrong input');
        }
        
        try {
            const newCollection = await Collections.findOneAndUpdate({ _id: collection._id }, { ...collection }, { new: true });
            return res.status(200).json(newCollection);
        } catch (e) {
            return res.status(500).json(e);
        }
        
    }
    async getUserCollection(req,res){
        const userId= req.user._id
        try{
            const collection = await Collections.find({userId:userId})
            return res.status(200).json(collection)
        }catch (e){
            return res.status(500).json(e)
        }
    }

}

module.exports = new CollectionControler()