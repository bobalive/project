const Collections = require('../db/Collections')
const Item = require('../db/item')
const path = require('path')
const Dropbox = require('dropbox').Dropbox;
require('dotenv').config();

class CollectionControler{
    async getAllCollections(req,res){
        const { id } = req.params;

        if (id) {
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
            return res.status(200).json(collections.filter((item,i) => ((true))))
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
    async createCollections(req, res) {
        console.log(req.user[0])

        try {
            const id = req.user[0]._id;
            const userName = req.user[0].name
            console.log(userName)
            const collections = req.body;
            collections.custom_fields = JSON.parse(req.body.custom_fields)


            if(req.file){
            let rawlink = []
            const dbx = new Dropbox({ accessToken: process.env.ACCES_TOKEN });
            const fileData = req.file.buffer
            const dropboxFilePath = '/uploads/' +(Math.random()*10000)+req.file.originalname  ; // Adjust as needed

            const fileuploaded = await dbx.filesUpload({ path: dropboxFilePath, contents: fileData })
            const response = await dbx.sharingCreateSharedLinkWithSettings({ path:fileuploaded.result.path_display })

            if( response.status  === 200){
                rawlink =  response.result.url.split('&')
                rawlink[1] = "raw=1"
                rawlink = rawlink.join("&")
            }
            collections.photo = rawlink
            }


            if (id && collections) {

                const userCollections = await Collections.create({ ...collections, userId: id , userName:userName});
                return res.status(200).json(userCollections);
            } else {

                return res.status(400).json('Incorrect data');
            }
        } catch (error) {
            console.error('Error creating collections:', error);
            return res.status(500).json('Internal server error');
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
        try {
            const id = req.user[0]._id;
            const collections = req.body;
            collections.custom_fields = JSON.parse(req.body.custom_fields)


            if(req.file){
                let rawlink = []
                const dbx = new Dropbox({ accessToken: process.env.ACCES_TOKEN });
                const fileData = req.file.buffer
                const dropboxFilePath = '/uploads/' +(Math.random()*10000)+req.file.originalname  ; // Adjust as needed

                const fileuploaded = await dbx.filesUpload({ path: dropboxFilePath, contents: fileData })
                const response = await dbx.sharingCreateSharedLinkWithSettings({ path:fileuploaded.result.path_display })

                if( response.status  === 200){
                    rawlink =  response.result.url.split('&')
                    rawlink[1] = "raw=1"
                    rawlink = rawlink.join("&")
                }
                collections.photo = rawlink
            }

            if (id && collections) {

                const userCollections = await Collections.findOneAndUpdate({_id:collections._id},{ ...collections, userId: id } ,{new:true});
                console.log(userCollections)

                return res.status(200).json(userCollections);
            } else {

                return res.status(400).json('Incorrect data');
            }
        } catch (error) {
            console.error('Error creating collections:', error);
            return res.status(500).json('Internal server error');
        }
        
    }
    async getUserCollection(req,res){
        const userId= req.user[0]._id
        try{
            const collection = await Collections.find({userId:userId})
            return res.status(200).json(collection)
        }catch (e){
            return res.status(500).json(e)
        }
    }
    async deleteCollection(req,res){
        const {id} = req.body
        const userId = req.user._id

        try{
            const collection = await Collections.deleteMany({_id:{$in:id}})
            const newCollections = await Collections.find({userId:userId})

            res.status(200).json(newCollections)
        }catch (e){
            res.status(400).json(e)
        }
    }

    async getCustomFields(req, res) {
        const { id } = req.params;

        try {
            const collections = await Collections.find({ items: { $in: [id] } });
            res.status(200).json({
                custom_fields:collections[0].custom_fields,
                collectionName:collections[0].name,
                userName:collections[0].userName
            });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async deleteCustomFields(req,res){
        const collectionId = req.query.collectionId;
        const valueId = req.query.valueId;
        const field = req.query.field
        console.log(field)
        try {
            const updatedCollection = await Collections.findOne({_id:collectionId})
            const updatedItems = await Item.find({collectionId:collectionId})

            updatedCollection.custom_fields[field] =updatedCollection.custom_fields[field].filter((_item , i)=> i != valueId)
            await updatedCollection.save()

            await Promise.all(updatedItems.map(async (item) => {
                item.custom_fields[field] = item.custom_fields[field].filter((value, i) => i != valueId);
                await item.save();
            }));

            if (!updatedCollection) {
                return res.status(404).json({ error: 'Collection not found' });
            }

            res.json(updatedCollection);
        } catch (error) {
            console.error('Error deleting value:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }


}

module.exports = new CollectionControler()