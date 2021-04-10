const express = require('express')
const Users = require('../models/dbHelpers')

const router = express.Router()

router.get('/', (req,res) => {
    Users.findAllUsers()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(error => {
        res.status(500).json({ message: 'Unable to retrieve users' })
    })
})

router.get('/:username', (req,res) => {
    const { username } = req.params
    Users.findUserByUsername(username)
    .then(user => {
        res.status(200).json(user)
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

module.exports = router