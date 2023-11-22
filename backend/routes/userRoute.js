const express = require('express')
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')

const router = express.Router()

router.route('/')
    .get(authController.verifyUser, authController.restrictTo('admin'), userController.getAllUsers)
    .post(userController.createUser)

router.route('/:userId')
    .get(authController.verifyUser, userController.getUser)

module.exports = router