const mongoose = require('mongoose')
const { User } = require('./user')

const Task = mongoose.model('Task', new mongoose.Schema({
	// creator: {
	// 	type: User,
	// 	required: true
	// },
	taskMessage: {
		type: String,
		required: true
	}
}))

function validateTask (params) {
	const validationResult = {};
	['creator', 'taskMessage'].forEach(fieldName => {
		if (!params[fieldName]) {
			validationResult.error = {
				errorMessage: `There's no '${fieldName}' field in your task`
			}
		}
	})

	return validationResult
}

module.exports.Task = Task
module.exports.validateTask = validateTask