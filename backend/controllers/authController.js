const User = require('../models/userModel')
const Note = require('../models/noteModel')
const jwt = require('jsonwebtoken')
const AppError = require('../utils/AppError')
const blacklistedTokens = require('../blacklistedTokens')

exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email }).select('+password')
        if (!user) return next(new AppError('User with this email doesn\'t exist'))

        const passwordIsValid = await user.validatePassword(password)

        if (!passwordIsValid) return next(new AppError('Invalid password', 401))

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        })

        user.password = undefined

        res.cookie('notes-app', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        })

        res.status(200).json({
            status: 'success',
            data: user
        })

    } catch (err) {
        res.status(401).json({
            status: 'fail',
            message: err.message
        })
    }
}

exports.protect = async (req, res, next) => {
    const token = req.cookies['notes-app']

    try {
        if (!token || blacklistedTokens.includes(token)) return next(new AppError('Invalid or expired token', 401))
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(decoded.id)
        if (!user) return next(new AppError('User not found', 404))

        req.user = user

        console.log('verified')
        next()

    } catch (err) {
        res.status(401).json({
            status: 'fail',
            data: err.message
        })
    }
}

// exports.verify = async (req, res, next) => {
//     const token = req.cookies['notes-app']
//     try {
//         if (!token || blacklistedTokens.includes(token)) return next(new AppError('Invalid or expired token', 401))
//         const decoded = jwt.verify(token, process.env.JWT_SECRET)

//         const user = await User.findById(decoded.id)
//         if(!user) return next(new AppError('User not found', 404))

//         const notes = await Note.find({user: user._id})
//         console.log(notes)

//         console.log('verified')

//         const newToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//             expiresIn: process.env.JWT_EXPIRES_IN
//         })

//         user.password = undefined

//         res.cookie('notes-app', newToken, {
//             httpOnly: true,
//             secure: true,
//             sameSite: 'None'
//         })

//         const userData =  {
//             id: user._id,
//             email: user.email,
//             notes: notes
//         }

//         res.status(200).json({
//             status: 'success',
//             data: userData
//         })

//     } catch (err) {
//         res.status(401).json({
//             status: 'fail',
//             data: err.message
//         })
//     }
// }

exports.authenticate = async (req, res, next) => {
    const token = req.cookies['notes-app']
    console.log(token)

    try {
        if (!token || blacklistedTokens.includes(token)) return next(new AppError('Invalid or expired token'))
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (!decoded) return next(new AppError('Invalid token'))

        const user = await User.findById(decoded.id)
        const notes = await Note.find({ user: user._id })

        const userData = {
            id: user._id,
            email: user.email,
            notes: notes
        }

        res.status(200).json({
            status: 'success',
            data: userData
        })
        
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Could not authenticate user'
        })
    }
}

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) return next(new AppError('You do not have permission to perform this action', 403))

        next()
    }
}

exports.updatePassword = async (req, res, next) => {
    const { currentPassword, newPassword, newPasswordConfirm } = req.body
    const user = req.user

    if (!currentPassword || !newPassword || !newPasswordConfirm) return next(new AppError('Password missing'))
    if (currentPassword === newPassword) return next(new AppError('New password cannot be the same as the old password'))

    try {
        const passwordIsValid = await user.validatePassword(currentPassword)
        console.log(currentPassword, newPassword, newPasswordConfirm)

        if (!passwordIsValid) return next(new AppError('Password incorrect', 400))
        if (newPassword !== newPasswordConfirm) return next(new AppError('Passwords do not match', 400))

        user.password = newPassword
        user.passwordConfirm = newPasswordConfirm
        await user.save()

        user.password = undefined

        res.status(201).json({
            status: 'success',
            data: user
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
}