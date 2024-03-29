const mongoose = require('mongoose');
const textSearch = require('mongoose-text-search');

const CollectionSchema = new mongoose.Schema({
        userId:String,
        userName:String,
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
            custom_date:[],
            custom_multi_line:[]
        }, 
        items:[String]
})
module.exports = mongoose.model('Collections' , CollectionSchema)