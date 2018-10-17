const express = require('express')
const router = express.Router()

// Controllers
const AuthController = require('../controllers/AuthController')
const ProfileController = require('../controllers/ProfileController')
const TasksController = require('../controllers/TasksController')

// Middlewares.
const canUserManageTasks = require('../middlewares/canUserManageTask')
const canUserReadTasks = require('../middlewares/сanUserReadTasks')
const userHasAuthToken = require('../middlewares/userHasAuthToken')
const userIsLogged = require('../middlewares/userIsLogged')
const userHasAuthToken = require('../middlewares/userHasAuthToken')
const userIsAdmin = require('../middlewares/userIsAdmin')

// Auth.
router.get('auth/', [userHasAuthToken], ProfileController.getInfo)
router.put('auth/password', [userHasAuthToken, userIsLogged], ProfileController.changePassword)

// Profile.
router.put('/profile/name', [userHasAuthToken, userIsLogged], ProfileController.changeName)
router.put('/profile/email', [userHasAuthToken, userIsLogged], ProfileController.changeEmail)
router.post('/profile/forget', ProfileController.forgetPassword)
router.post('/profile/register', AuthController.register)
router.post('/profile/login', AuthController.login)

// Tasks.
router.get('tasks/', [userHasAuthToken, canUserReadTasks], TasksController.getList)
router.get('tasks/:id', [userHasAuthToken, canUserReadTasks], TasksController.get)
router.post('tasks/', [userHasAuthToken], TasksController.add);
router.put('tasks/:id', [userHasAuthToken, canUserManageTasks], TasksController.put);
router.delete('tasks/:id', [userHasAuthToken, canUserManageTasks], TasksController.remove);
router.post('tasks/:id/share', [userHasAuthToken, canUserManageTasks], TasksController.share);

// Users.
router.get('/users/', [userHasAuthToken], UsersController.getList)
router.get('/users/:id', [userHasAuthToken], UsersController.get)
router.put('/users/:id', [userHasAuthToken, userIsAdmin], UsersController.put)
router.delete('/users/:id', [userHasAuthToken, userIsAdmin], UsersController.remove);

module.exports = router