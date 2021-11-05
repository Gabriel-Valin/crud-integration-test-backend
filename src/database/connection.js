const mongoose = require('mongoose')

const openConnection = async () => {
    await mongoose.connect('mongodb+srv://gvtech:gabrielvalin11@cluster0.f272f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
}

module.exports = {
    openConnection
}