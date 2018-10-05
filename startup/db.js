const winston = require('winston')
const mongoose = require('mongoose')
const config = require('config')

module.exports = () => {
	const { prefix, host, database } = config.get('db')
	const connectionString = `${prefix}${host}/${database}`

	const currentDate = (new Date()).toISOString()

	mongoose.connect(connectionString, { useNewUrlParser: true })
		.then(() => winston.info(`Connected to ${connectionString} at ${currentDate}`))
}