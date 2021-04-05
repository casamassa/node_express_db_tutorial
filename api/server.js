const express = require('express')

const lessonsRouter = require('../routes/lessons-routes')
const messagesRouter = require('../routes/messages-routes')
const usersRouter = require('../routes/users-routes')

const server = express()

server.use(express.json())

server.get('/', (req, res) => {
    res.json({message: 'Test get API'})
})

server.use('/api/lessons', lessonsRouter)
server.use('/api/messages', messagesRouter)
server.use('/api/users', usersRouter)

module.exports = server