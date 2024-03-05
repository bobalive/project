const mongoose = require('mongoose');

const CollectionSchema = new mongoose.Schema({
        userId:String,
        name: { type: String, required: true },
        theme: {
            type: String,
            enum: ["Books", "Signs", "Silverware"],
        },
        photo: String,
        custom_Fields:{
            custom_string: [{ name: String , state: Boolean  }],
            custom_int:[{name:String , state:Boolean}],
            custom_boolean:[{name:String}],
            custom_date:[{name:String}]
        }, 
        items:[String]
})

module.exports = mongoose.model('Collections' , CollectionSchema)