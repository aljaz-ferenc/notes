const Note = require('../models/noteModel')
const AppError = require('../utils/AppError')

exports.createNote = async (req, res, next) => {
    const {title, content, createdAt, tags} = req.body
    if(!title || !content || !tags) return next(new AppError('Fields missing', 400))

    try{
        const note = await Note.create({title, content, tags})

        res.status(201).json({
            status: 'success',
            data: note
        })

    }catch(err){
        res.status(500).json({
            status: 'fail',
            message: 'New note could not be created'
        })
    }
}

exports.getAllNotes = async (req, res, next) => {
    try{
        const notes = await Note.find()
        
        res.status(200).json({
            status: 'success',
            data: notes
        })
    }catch(err){
        res.status(500).json({
            status: 'error',
            message: 'Could not find notes'
        })
    }
}

exports.updateNote = async (req, res, next) => {
    const {noteId} = req.params
    const updatedFields = req.body
    console.log(updatedFields)
    try{
        const note = await Note.findByIdAndUpdate(noteId, {...updatedFields}, {new: true})
        if(!note) return next(new AppError('This note doesn\'t exist'))

        res.status(201).json({
            status: 'success',
            data: note
        })

    }catch(err){
        res.status(500).json({
            status: 'error',
            message: 'Could not update note'
        })
    }
}