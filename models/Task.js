const mongoose = require('mongoose')

const Task = mongoose.model('Task', new mongoose.Schema({
	author: {
		type: String,
		required: true
	},
	taskMessage: {
		type: String,
		required: true
	}
}))

function validateTask (params) {
	const validationResult = {};
	['author', 'taskMessage'].forEach(fieldName => {
		if (!params[fieldName]) {
			validationResult.error = {
				errorMessage: `There's no '${fieldName}' field in your task`
			}
		}
	})
	console.log(validationResult)
	return validationResult
}

module.exports.Task = Task
module.exports.validateTask = validateTask