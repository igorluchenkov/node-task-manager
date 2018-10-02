const express = require('express')
const tasksRoutes = require('../routes/tasks')
const tasksManagementRoutes = require('../routes/tasksManagement')
const authRoutes = require('../routes/auth')
const profileRoutes = require('../routes/profile')
const error = require('../middlewares/error')

module.exports = function (app) {
	app.use(express.json())
	app.use('/tasks/', tasksRoutes)
	app.use('/tasks/management', tasksManagementRoutes)
	app.use('/auth/', authRoutes)
	app.use('/profile/', profileRoutes)
	app.use(error)
}