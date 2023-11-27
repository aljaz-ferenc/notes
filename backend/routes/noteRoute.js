const express = require('express')
const noteController = require('../controllers/noteController')
const router = express.Router()

router.route('/')
    .post(noteController.createNote)

router.route('/:noteId')
    .get(noteController.getNoteById)
    .patch(noteController.updateNote)
    .delete(noteController.deleteNote)

router.route('/users/:userId')
    .get(noteController.getNotesByUser)
module.exports = router