const express = require('express')
const noteController = require('../controllers/noteController')
const authController = require('../controllers/authController')

const router = express.Router()

router.route('/')
    .post(authController.verifyUser, noteController.createNote)
    .get(authController.verifyUser, authController.restrictTo('admin'), noteController.getAllNotes)
    
router.route('/:noteId')
    .patch(authController.verifyUser, noteController.updateNote)
    .delete(authController.verifyUser, noteController.deleteNote)
module.exports = router