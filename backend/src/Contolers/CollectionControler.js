const Users = require("../db/Users")
const Collections = require('../db/Collections')
const fs = require('fs');
const path = require('path')
const Dropbox = require('dropbox').Dropbox;

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
        try {
            const id = req.user[0]._id;
            const collections = req.body;
            console.log(collections)
            if (!req.file) {
                return res.status(400).json('No file uploaded');
            }

            const dbx = new Dropbox({ accessToken: 'sl.BxlGDAZPozdDgp6vR0pd3hldk3OJMf4NDuOAf8avLx4_zmXhtf7hAF7Mj5WypeVNLPJdmb8rkzP1-3YqL-z7nRtx42Rqfnko6L7jFY3Peoe-7RYHnTjBWOzWS73Uc5c5STI9SKY18yoqfSAHgSPB' });
            const fileData = req.file.buffer
            const dropboxFilePath = '/uploads/' +  collections._id+req.file.originalname  ; // Adjust as needed

            // Upload the file to Dropbox
            const fileuploaded = await dbx.filesUpload({ path: dropboxFilePath, contents: fileData })

            console.log(fileuploaded)
            const link = dbx.sharingCreateSharedLinkWithSettings({ path:fileuploaded.result.path_display })
                .then(response => {
                    const rawLink =  response.result.url.split('&')
                    rawLink[1] = "raw=1"
                    console.log('Shared link to the image:', rawLink.join("&"));
                })
                .catch(error => {
                    console.error('Error creating shared link:', error);
                });


            if (id && collections) {

                const userCollections = await Collections.create({ ...collections, userId: id });


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

        try{
            const collection = await Collections.deleteMany({_id:{$in:id}})
            const newCollections = await Collections.find()

            res.status(200).json(newCollections)
        }catch (e){
            res.status(400).json(e)
        }
    }

}

module.exports = new CollectionControler()