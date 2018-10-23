const express = require('express')
const router = express.Router()

// Controllers.
const {
  AuthController,
  ProfileController,
  TasksController,
  UsersController
} = require('../controllers')

// Middlewares.
const {
  userCanManageTask,
  userIsLogged,
  userHasAuthToken,
  userIsAdmin
} = require('../middlewares')

// Auth.
router.post('/auth/register', AuthController.register)
router.post('/auth/login', AuthController.login)

// Profile.
router.get('/profile/', [userHasAuthToken], ProfileController.getInfo)
router.post('/profile/forget', ProfileController.forgetPassword)
router.put('/profile/name', [userHasAuthToken, userIsLogged], ProfileController.changeName)
router.put('/profile/email', [userHasAuthToken, userIsLogged], ProfileController.changeEmail)
router.put('/profile/password', [userHasAuthToken, userIsLogged], ProfileController.changePassword)

// Tasks.
router.get('/tasks/', [userHasAuthToken], TasksController.getList)
router.get('/tasks/:id', [userHasAuthToken], TasksController.get)
router.post('/tasks/', [userHasAuthToken], TasksController.add)
router.post('/tasks/:id/share', [userHasAuthToken, userCanManageTask], TasksController.share)
router.put('/tasks/:id', [userHasAuthToken, userCanManageTask], TasksController.put)
router.delete('/tasks/:id', [userHasAuthToken, userCanManageTask], TasksController.remove)

// Users.
router.get('/users/', [userHasAuthToken], UsersController.getList)
router.get('/users/:id', [userHasAuthToken], UsersController.add)
router.post('/users/', [userHasAuthToken, userIsAdmin], UsersController.add)
router.put('/users/:id', [userHasAuthToken, userIsAdmin], UsersController.put)
router.delete('/users/:id', [userHasAuthToken, userIsAdmin], UsersController.remove)

module.exports = router