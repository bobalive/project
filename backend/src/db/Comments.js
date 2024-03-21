const mongoose = require('mongoose');

const CommentScema = new mongoose.Schema({
    userId:String,
    userName:String,
    collectionId:String,
    itemId:String,
    content:String,
    date:String
})

module.exports = mongoose.model('Comment' , CommentScema)