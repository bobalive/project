const mongoose = require('mongoose')
const textSearch = require('mongoose-text-search');
const ItemSchema = new mongoose.Schema({
    usrId:String,
    collectionId:String,
    name:String,
    tags:[String],
    custom_fields:{
        custom_string: [String],
        custom_int:[Number],
        custom_boolean:[Boolean],
        custom_date:[String],
        custom_multi_line:[String]
    },
    userName:String,
    collectionName:String,
    likes:[String]

})

module.exports = mongoose.model( 'Item', ItemSchema )