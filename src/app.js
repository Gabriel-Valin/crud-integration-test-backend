const express = require('express')
const app = express()

const { usersRouter } = require('./routes/user-routes')

app.use(express.json())
app.use('/users', usersRouter)

app.get('/health', (request, response) => {
    return response.json({ message: 'Health Check ✅' })
})


module.exports = { app }