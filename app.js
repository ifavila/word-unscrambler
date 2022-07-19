const config = require('./utils/config')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const wordRouter = require('./controllers/words')
const cors = require('cors')

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB: ', error.message)
    })

app.use(cors())
app.use('/api/words', wordRouter)

module.exports = app