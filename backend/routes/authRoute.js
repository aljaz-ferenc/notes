const express = require('express')
const authController = require('../controllers/authController')

const router = express.Router()

router.route('/login')
    .post(authController.loginUser)

router.route('/')
    .post(authController.authenticate)

router.route('/updatePassword')
    .patch(authController.protect, authController.updatePassword)

module.exports = router