const express = require('express')
const tasksRoutes = require('../routes/tasks')
const authRoutes = require('../routes/auth')
const profileRoutes = require('../routes/profile')
const errorHandler = require('../middlewares/errorHandler')

module.exports = app => {
	app.use(express.json())
	app.use('/tasks/', tasksRoutes)
	app.use('/auth/', authRoutes)
	app.use('/profile/', profileRoutes)
	app.use(errorHandler)
}