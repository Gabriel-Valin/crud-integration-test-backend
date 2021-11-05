const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    created_at: { type: Date, default: Date.now },
    techs: [String]
})

const User = mongoose.model('User', UserSchema)
module.exports = User