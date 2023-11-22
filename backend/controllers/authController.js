const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const AppError = require('../utils/AppError')
const blacklistedTokens = require('../blacklistedTokens')

exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body
    
    try{
        const user = await User.findOne({email}).select('+password')
        if(!user) return next(new AppError('User with this email doesn\'t exist'))

        const passwordIsValid = await user.validatePassword(password)

        if(!passwordIsValid) return next(new AppError('Invalid password', 401))

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

    }catch(err){
        res.status(401).json({
            status: 'fail',
            message: err.message
        })
    }
}

exports.verifyUser = async (req, res, next) => {
    const token = req.cookies['notes-app']

    try{
        if(!token || blacklistedTokens.includes(token)) return next(new AppError('Invalid or expired token', 401))
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.id
        console.log('verified')
        next()
        
    }catch(err){
        res.status(401).json({
            status: 'fail',
            data: err.message
        })
    }
}