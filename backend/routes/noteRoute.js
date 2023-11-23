const express = require('express')
const noteController = require('../controllers/noteController')
const authController = require('../controllers/authController')

const router = express.Router()

router.route('/')
    .post(authController.protect, noteController.createNote)
    .get(authController.protect, authController.restrictTo('admin'), noteController.getAllNotes)
    
router.route('/:noteId')
    .patch(authController.protect, noteController.updateNote)
    .delete(authController.protect, noteController.deleteNote)
module.exports = router