const mongoose = require('mongoose')
require('dotenv/config')

const openConnection = async () => {
    await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}

module.exports = {
    openConnection
}