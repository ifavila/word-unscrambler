const wordRouter = require('express').Router()
const res = require('express/lib/response')
const Word = require('../models/word')

wordRouter.get('/', (request, response) => {
    Word.find({
        "word": { $exists: true },
        $expr: { $gt: [ { $strLenCP:"$word"}, 14]}
    }).then(word => {
        response.json(word)
    })
})

module.exports = wordRouter