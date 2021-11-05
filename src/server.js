const express = require('express')
const { openConnection } = require('./database/connection')
const app = express()

app.use(express.json())

app.get('/health', (request, response) => {
    return response.json({ message: 'Health Check ✅' })
})

openConnection().then(() => {
    console.log('Connect Database ✅')
    app.listen(3232, () => console.log('running at port 3232'))
})
