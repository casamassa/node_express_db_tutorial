const express = require('express')
const Users = require('../models/dbHelpers')
const bcrypt = require('bcryptjs')

const router = express.Router()

// for all endpoints beginning with /api/users
router.post('/register', (req,res) => {
    const credentials = req.body
    const { username, password } = credentials

    if(!(username && password)) {
        return res.status(400).json({ message: 'Username and password required' })
    }

    const hash = bcrypt.hashSync(credentials.password, 12)
    credentials.password = hash

    Users.addUser(credentials)
    .then(user => { 
        res.status(200).json(user) 
    })
    .catch(error => { 
        if (error.errno == 19) {
            res.status(400).json({ message: 'Username already taken' })
        } else {
            res.status(500).json(error) 
        }
    })
}) 

router.post('/login', (req,res) => {
    const { username, password } = req.body

    if(!(username && password)) {
        return res.status(400).json({ message: 'Username and password required' })
    }

    Users.findUserByUsername(username)
    .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
            res.status(200).json({ message: `Welcome ${user.username}` })
        } else {
            res.status(401).json({ message: 'Invalid credentials' })
        }
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

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