const connection = require('../database/connection')
const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')

router.post('/user', UserController.newUser)
router.get('/users', UserController.getUsers)
router.get('/user/:id', UserController.getUser)
router.put('/user', UserController.updateUser)
router.delete('/user/:id', UserController.removeUser)
router.post('/login', UserController.login)

module.exports = router
