const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    role: { type: String, enum: ['admin', 'user'] },
    status: { type: String, enum: ['blocked', 'active'] },
});

module.exports = mongoose.model('User', UserSchema);
