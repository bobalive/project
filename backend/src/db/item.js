const mongoose = require('mongoose')

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

})

module.exports = mongoose.model( 'Item', ItemSchema )