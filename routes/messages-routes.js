const express = require('express')
const Lessons = require('../models/dbHelpers')

const router = express.Router()

// for all endpoints start with /api/messages/
router.delete('/:id', (req, res) => {
    const { id } = req.params
    Lessons.removeMessage(id)
        .then(count => {
            if(count > 0) {
                res.status(200).json({ message: `Message with id ${id} successfully deleted` })
            } else {
                res.send(404).json({ message: 'No message with that id' })
            }
        })
        .catch(error => {
            res.status(500).json({ message: 'Error deleting message' })
        })
})

module.exports = router
