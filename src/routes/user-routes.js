const express = require('express')
const usersRouter = express.Router()

const usersController = require('../controllers/users-controller')

usersRouter.post('/', usersController.createUser)

module.exports = {
    usersRouter
}