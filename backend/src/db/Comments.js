const mongoose = require('mongoose');
const textSearch = require('mongoose-text-search');
const CommentScema = new mongoose.Schema({
    userId:String,
    userName:String,
    collectionId:String,
    itemId:String,
    content:String,
    date:String
})

module.exports = mongoose.model('Comment' , CommentScema)