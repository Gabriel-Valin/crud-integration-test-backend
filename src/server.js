const { openConnection } = require('./database/connection')
const { app } = require('./app')
require('dotenv/config')

openConnection().then(() => {
    console.log('Connect Database ✅')
    const port = process.env.PORT || 3000
    app.listen(port, () => console.log(`running at port ${port}`))
})
