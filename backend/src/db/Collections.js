const mongoose = require('mongoose');

const CollectionSchema = new mongoose.Schema({
        userId:String,
        name: { type: String, required: true },
        theme: {
            type: String,
            enum: ["Books", "Signs", "Silverware"],
        },
        description:String,
        photo: String,
        custom_fields:{
            custom_string: [],
            custom_int:[],
            custom_boolean:[],
            custom_date:[]
        }, 
        items:[{
            collectionId:String,
            userId:String,
            name:String,
            tags:[String],
            fields:[{name:String , value:String}],
            req_fields:[{name:String, value:String}]
        }]
})

module.exports = mongoose.model('Collections' , CollectionSchema)