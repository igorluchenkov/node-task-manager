const express = require('express')
const router = express.Router()

// Controllers
const AuthController = require('../controllers/AuthController')
const ProfileController = require('../controllers/ProfileController')
const TasksController = require('../controllers/TasksController')
const UsersController = require('../controllers/UsersController')

// Middlewares.
const userCanManageTask = require('../middlewares/userCanManageTask')
const userCanReadTasks = require('../middlewares/userCanReadTasks')
const userIsLogged = require('../middlewares/userIsLogged')
const userHasAuthToken = require('../middlewares/userHasAuthToken')
const userIsAdmin = require('../middlewares/userIsAdmin')

// Auth.
router.post('/profile/register', AuthController.register)
router.post('/profile/login', AuthController.login)

// Profile.
router.get('/profile/', [userHasAuthToken], ProfileController.getInfo)
router.post('/profile/forget', ProfileController.forgetPassword)
router.put('/profile/name', [userHasAuthToken, userIsLogged], ProfileController.changeName)
router.put('/profile/email', [userHasAuthToken, userIsLogged], ProfileController.changeEmail)
router.put('/profile/password', [userHasAuthToken, userIsLogged], ProfileController.changePassword)

// Tasks.
router.get('/tasks/', [userHasAuthToken, userCanReadTasks], TasksController.getList)
router.get('/tasks/:id', [userHasAuthToken, userCanReadTasks], TasksController.get)
router.post('/tasks/', [userHasAuthToken], TasksController.add)
router.post('/tasks/:id/share', [userHasAuthToken, userCanManageTask], TasksController.share)
router.put('/tasks/:id', [userHasAuthToken, userCanManageTask], TasksController.put)
router.delete('/tasks/:id', [userHasAuthToken, userCanManageTask], TasksController.remove)

// Users.
router.get('/users/', [userHasAuthToken], UsersController.getList)
router.get('/users/:id', [userHasAuthToken], UsersController.get)
router.put('/users/:id', [userHasAuthToken, userIsAdmin], UsersController.put)
router.delete('/users/:id', [userHasAuthToken, userIsAdmin], UsersController.remove)

module.exports = router