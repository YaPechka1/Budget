const express = require('express')
const app = express()

const passport = require('passport')
const bodyParser = require('body-parser')

const authRoutes = require('./routes/auth')
const infoRoutes = require('./routes/info')
const operatorRoutes = require('./routes/operator')
const administratorRoutes = require('./routes/administrator')

app.use(passport.initialize())
require('./tools/passport')(passport)

app.use(require('morgan')('dev'))

app.use('/files', express.static('files'))

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(require('cors')())


app.use('/api/auth',authRoutes)
app.use('/api/info',infoRoutes)
app.use('/api/operator',operatorRoutes)
app.use('/api/administrator',administratorRoutes)



module.exports = app