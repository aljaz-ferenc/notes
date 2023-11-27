const express = require('express')
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')

const router = express.Router()

router.route('/')
    .get( authController.protect, authController.restrictTo('admin'), userController.getAllUsers)
    .post(userController.createUser)

router.route('/:userId')
    .get( authController.protect, userController.getUser)
    .delete(authController.protect, userController.deleteUser)

module.exports = router