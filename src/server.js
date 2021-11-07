const { openConnection } = require('./database/connection')
const { app } = require('./app')

openConnection().then(() => {
    console.log('Connect Database ✅')
    app.listen(3232, () => console.log('running at port 3232'))
})
