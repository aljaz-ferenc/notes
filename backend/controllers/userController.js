const User = require('../models/userModel')
const Note = require('../models/noteModel')
const jwt = require('jsonwebtoken')
const blacklistedTokens = require('../blacklistedTokens')
const AppError = require('../utils/AppError')

exports.createUser = async (req, res, next) => {
    const { password, passwordConfirm, email, role } = req.body

    try {
        const user = await User.create({ email, password, passwordConfirm, role })

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        })

        res.cookie('notes-app', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        })

        res.status(201).json({
            status: 'success',
            data: user
        })

    } catch (err) {
        let errorMessage = err.message

        if (err.code === 11000 && err.keyPattern.email === 1) errorMessage = 'User with this email already exists'

        res.status(400).json({
            status: 'fail',
            message: errorMessage
        })
    }
}

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find()

        res.status(200).json({
            status: 'success',
            data: users
        })

    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Could not get users'
        })
    }
}

exports.getUser = async (req, res, next) => {
    const {userId} = req.params
    
    try{
        const user = await User.findById(userId)
        if(!user) return next(new AppError('This user doesn\' exist', 404))

        const notes = await Note.find({user: user._id})
        
        const userData =  {
            id: user._id,
            email: user.email,
            notes: notes
        }

        res.status(200).json({
            status: 'success',
            data: userData
        })
        
    }catch(err){
        res.status(500).json({
            status: 'error',
            message: err.message
        })
    }
}

exports.deleteUser = async (req, res, next) => {
    const {email, password} = req.body
    const userId = req.user._id.toString()
    try{
        const user = await User.findOne({email})

        if(!user || user._id.toString() !== userId) return next(new AppError('Wrong email.', 404))

        const passwordIsValid = await user.validatePassword(password)
        if(!passwordIsValid) return next(new AppError('Password invalid', 401))
        
        await user.deleteOne()
        const token = req.cookies['notes-app']
        blacklistedTokens.push(token)

        res.status(200).json({
            status: 'success',
        })

    }catch(err){
        res.status(500).json({
            status: 'error',
            message: err.message
        })
    }
}