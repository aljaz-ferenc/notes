const express = require('express')
const authController = require('../controllers/authController')

const router = express.Router()

router.route('/login')
    .post(authController.loginUser)

router.route('/updatePassword')
    .patch(authController.verifyUser, authController.updatePassword)

module.exports = router