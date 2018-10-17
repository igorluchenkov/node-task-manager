const express = require('express')
const tasksRoutes = require('../routes/tasks')
const authRoutes = require('../routes/auth')
const profileRoutes = require('../routes/profile')
const usersRoutes = require('../routes/users')
const apiRoutes = require('../routes')
const errorHandler = require('../middlewares/errorHandler')

module.exports = app => {
	app.use(express.json())
	app.use('/', apiRoutes)
	// app.use('/tasks/', tasksRoutes)
	// app.use('/auth/', authRoutes)
	// app.use('/profile/', profileRoutes)
	// app.use('/users/', usersRoutes)
	app.use(errorHandler)
}