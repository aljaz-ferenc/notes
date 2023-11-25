const express = require('express')
const noteController = require('../controllers/noteController')
const authController = require('../controllers/authController')

const router = express.Router()

router.route('/')
    .post(authController.protect, noteController.createNote)
    .get(authController.protect, authController.restrictTo('admin'), noteController.getAllNotes)

router.route('/:noteId')
    .get(authController.protect, noteController.getNoteById)
    .patch(authController.protect, noteController.updateNote)
    .delete(authController.protect, noteController.deleteNote)

router.route('/users/:userId')
    .get(authController.protect, noteController.getNotesByUser)
module.exports = router