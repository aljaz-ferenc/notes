const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

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
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, {
    methods: {
        validatePassword: async function (candidate){
            const passwordIsValid = await bcrypt.compare(candidate, this.password)
            return passwordIsValid
        }
    }
})

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next()

    this.password = await bcrypt.hash(this.password, 12)
    this.passwordConfirm = undefined
})

module.exports = mongoose.model('User', userSchema)