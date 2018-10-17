const express = require('express')
const routes = require('../routes')
const errorHandler = require('../middlewares/errorHandler')

module.exports = app => {
	app.use(express.json())
	app.use('/', routes)
	app.use(errorHandler)
}