const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

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
        
        res.status(200).json({
            status: 'success',
            data: user
        })
    }catch(err){
        res.status(500).json({
            status: 'error',
            message: err.message
        })
    }
}