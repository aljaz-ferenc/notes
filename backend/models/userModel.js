const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: [true, 'A user with this email already exists'],
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        validate: [validator.isEmail, 'Email imvalid']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Confirm your password'],
        validate: {
            validator: function(passConfirm){
                return passConfirm === this.password
            },
            message: 'Passwords do not match'
        }
    },
    role: {
        tpye: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
})

module.exports = mongoose.model('User', userSchema)