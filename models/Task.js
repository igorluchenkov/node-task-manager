const mongoose = require('mongoose')
const Joi = require('joi')

const Task = mongoose.model('Task', new mongoose.Schema({
	taskMessage: {
		type: String,
		required: true
	}
}))

function validateTask (task) {
	const schema = {
		taskMessage: Joi.string().required()
	}

	return Joi.validate(task, schema)
}

module.exports.Task = Task
module.exports.validateTask = validateTask