const Users = require("../db/Users")

class CollectionControler{
    async createCollections(req,res){
        try{

       
        const {id ,collections} = req.body
        const user = await Users.findById(id)
        console.log(collections);

        user.collections.push({...collections})
        user.save()
        res.status(200).json(user.collections)
        }catch{
            res.status(500)
        }
    }
}

module.exports = new CollectionControler()