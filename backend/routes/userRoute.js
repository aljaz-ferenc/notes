const express = require('express')
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')

const router = express.Router()

router.route('/')
    .get(authController.protect, authController.restrictTo('admin'), userController.getAllUsers)
    .post(authController.protect, userController.createUser)

router.route('/:userId')
    .get(authController.protect, userController.getUser)

module.exports = router