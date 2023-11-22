const express = require('express')
const noteController = require('../controllers/noteController')

const router = express.Router()

router.route('/')
    .post(noteController.createNote)
    
module.exports = router