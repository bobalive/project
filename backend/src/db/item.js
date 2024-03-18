const mongoose = require('mongoose')

const ItemSchema = mongoose.Schema({
    usrId:String,
    collectionId:String,
    name:String,
    tags:[String],
    custom_fields:{
        custom_string: [],
        custom_int:[],
        custom_boolean:[],
        custom_date:[]
    },

})

module.exports = mongoose.model( 'Item', ItemSchema )