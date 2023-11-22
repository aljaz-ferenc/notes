const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    content: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    tags: {
        type: [String]
    }
})

module.exports = mongoose.model('Note', noteSchema)