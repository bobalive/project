const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    role: { type: String, enum: ['admin', 'user'] },
    status: { type: String, enum: ['blocked', 'active'] },
    collections: [{
        collection_id: mongoose.Schema.Types.ObjectId,
        name: { type: String, required: true },
        theme: {
            type: String,
            enum: ["Books", "Signs", "Silverware"],
        },
        photo: String,
        custom_string1_name: { type: String, state: {type:Boolean , default:false} }, 
        custom_string2_name: { type: String,  state: {type:Boolean , default:false} }, 
        custom_string3_name: { type: String,  state: {type:Boolean , default:false}}, 
        custom_int1_name: { type: String,  state: {type:Boolean , default:false} }, 
        custom_int2_name: { type: String,  state: {type:Boolean , default:false} }, 
        custom_int3_name: { type: String,  state: {type:Boolean , default:false} }, 
        custom_boolean1_name: { type: Boolean,  state: {type:Boolean , default:false} }, 
        custom_boolean2_name: { type: Boolean, state: {type:Boolean , default:false} }, 
        custom_boolean3_name: { type: Boolean,  state: {type:Boolean , default:false} }, 
        custom_date1_name: { type: String, state: {type:Boolean , default:false} }, 
        custom_date2_name: { type: String,  state: {type:Boolean , default:false} }, 
        custom_date3_name: { type: String,  state: {type:Boolean , default:false} }, 
        items: [{
            item_id: mongoose.Schema.Types.ObjectId,
            name: String,
            tags: [String],
            commets:[{
                text:String,
                date:Date,
                from:String
            }]
        }]
    }]
});

module.exports = mongoose.model('User', UserSchema);
