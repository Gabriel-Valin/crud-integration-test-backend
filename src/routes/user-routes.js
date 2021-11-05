const express = require('express')
const usersRouter = express.Router()

const usersController = require('../controllers/users-controller')

usersRouter.post('/', usersController.createUser)
usersRouter.get('/', usersController.findAll)
usersRouter.get('/:id', usersController.findOne)
usersRouter.put('/:id', usersController.updateUser)
usersRouter.delete('/:id', usersController.delete)

module.exports = {
    usersRouter
}