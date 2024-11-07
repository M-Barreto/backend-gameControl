const connection = require('../database/connection')
const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const GamesController = require('../controllers/GamesController')

router.post('/user', UserController.newUser)
router.get('/users', UserController.getUsers)
router.get('/user/:id', UserController.getUser)
router.put('/user', UserController.updateUser)
router.delete('/user/:id', UserController.removeUser)
router.post('/login', UserController.login)
router.put('/user/password', UserController.updatePassword)

router.post('/game', GamesController.addGames)
router.get('/games', GamesController.getGames)
router.get('/game/:id', GamesController.getGame)

module.exports = router
