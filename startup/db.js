const winston = require('winston')
const mongoose = require('mongoose')
const config = require('config')

module.exports = () => {
	const { prefix, host, database } = config.get('db')
	const connectionString = `${prefix}${host}/${database}`
	console.log(connectionString)

	mongoose.connect(connectionString, { useNewUrlParser: true })
		.then(() => winston.info('Connected to MongoDB...'))
		.catch(console.log)
}