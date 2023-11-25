const Note = require('../models/noteModel')
const AppError = require('../utils/AppError')

exports.createNote = async (req, res, next) => {
    const { title, content, tags } = req.body
    console.log(req.user)
    if (!title || !content || !tags) return next(new AppError('Fields missing', 400))

    try {
        const note = await Note.create({ title, content, tags, user: req.user.id })
        const notes = await Note.find({ user: req.user._id })

        res.status(201).json({
            status: 'success',
            data: notes
        })

    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: 'New note could not be created'
        })
    }
}

exports.getAllNotes = async (req, res, next) => {
    try {
        const notes = await Note.find()

        res.status(200).json({
            status: 'success',
            data: notes
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Could not find notes'
        })
    }
}

exports.updateNote = async (req, res, next) => {
    const { noteId } = req.params
    const updatedFields = req.body
    console.log(updatedFields)
    try {
        const note = await Note.findByIdAndUpdate(noteId, { ...updatedFields }, { new: true })
        const allNotes = await Note.find({ user: req.user._id })
        if (!note) return next(new AppError('This note doesn\'t exist'))

        res.status(201).json({
            status: 'success',
            data: note
        })

    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Could not update note'
        })
    }
}

exports.deleteNote = async (req, res, next) => {
    const { noteId } = req.params

    try {
        const note = await Note.findById(noteId)
        if (!note) return next(new AppError('This note doesn\'t exist'))

        //Can only delete own note, or if role === 'admin' 
        if (req.user._id.toString() === note.user.toString() || req.user.role === 'admin') {
            await note.deleteOne()

            const notes = await Note.find()

            res.status(200).json({
                status: 'success',
                data: notes
            })
        } else {
            return next(new AppError('You do not have permission to perform this action', 401))
        }

    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Could not delete the note'
        })
    }
}

exports.getNotesByUser = async (req, res, next) => {
    const { userId } = req.params

    try {
        const notes = await Note.find({ user: userId })

        res.status(200).json({
            status: 'success',
            data: notes
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Could not find notes'
        })
    }
}

exports.getNoteById = async (req, res, next) => {
    const {noteId} = req.params

    try{
        const note = await Note.findById(noteId)

        res.status(200).json({
            status: 'success',
            data: note
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Could not find note'
        })
    }
}