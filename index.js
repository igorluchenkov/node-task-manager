const express = require('express')
const app = express()

require('./start/logging')()
require('./start/routes')(app)
require('./start/db')()
require('./start/config')()

const port = process.env.port || 3000
app.listen(port)