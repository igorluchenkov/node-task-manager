const config = require('config')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 255
	},
	email: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 255,
		unique: true
	},
	password: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 1024,
		unique: false
	},
	tasks: {
		type: [{
			id: mongoose.Schema.Types.ObjectId,
			readonly: Boolean
		}]
	}
})

userSchema.methods.generateAuthToken = function () {
	const { _id, name, email, tasks } = this
	const token = jwt.sign(
		{ _id, name, email, tasks }, 
		config.get('jwtPrivateKey')
	)
	
	return token
}

const User = mongoose.model('User', userSchema)

const validateUser = user => {
	const task = Joi.object().keys({
		id: Joi.objectId(),
		readonly: Joi.boolean()
	})

	const schema = {
		name: Joi.string().min(5).max(50).required(),
		email: Joi.string().min(5).max(255).required().email(),
		password: Joi.string().min(5).max(1024).required()
		// tasks: Joi.array().required().items(task)
	}

	return Joi.validate(user, schema)
}

module.exports.User = User
module.exports.validateUser = validateUser