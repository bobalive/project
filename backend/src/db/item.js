const mongoose = require('mongoose')

const ItemSchema = mongoose.Schema({
    usrId:String,
    collectionId:String,
    name:String,
    tags:[String],
    custom_fields:[{name:String , value:String}],

})

module.exports = mongoose.model( 'Item', ItemSchema )