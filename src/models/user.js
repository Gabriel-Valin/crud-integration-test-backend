const mongoose = require('mongoose')

const { Schema } = mongoose

const userSchema = new Schema({
    first_name: String,
    last_name: String,
    email: String,
    created_at: { type: Date, default: Date.now },
    techs: [String]
})

module.exports = {
    userSchema
}