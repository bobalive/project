const mongoose = require('mongoose')

const ItemSchema = mongoose.Schema({
    collectionId:String,
    name:String,
    tags:[String],
    fields:[{name:String , value:String}],
    req_fields:[{name:String, value:String}]
})

module.exports = mongoose.model( 'Item', ItemSchema )