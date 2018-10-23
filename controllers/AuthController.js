const Joi = require('joi')
const { User } = require('../models/user')
const _ = require('lodash')
const bcrypt = require('bcryptjs')
const Mailer = require('../helpers/mailer')

const register = async (req, res) => {
	const { error } = validateRegister(req.body)
	if (error) return res.status(400).send(error.details[0].message)

	let user = await User.findOne({ email: req.body.email })
	if (user) return res.status(400).send('User already registered')

	user = new User(_.pick(req.body, ['_id', 'name', 'email', 'password']))
	const salt = await bcrypt.genSalt(10)
	user.password = await bcrypt.hash(user.password, salt);
	user.tasks = []
	await user.save()

	const mail = Mailer.sendMail({
		to: req.body.email,
		subject: 'Thank you for join our resource!',
		text: `Dear ${user.name}
		Thank you for signing up to our Task Manager!`
	})
	
	mail
		.then(console.log)
		.catch(console.error)
		
	const token = user.generateAuthToken()
	res.send(token);
}

const login = async (req, res) => {
	const { error } = validateLogin(req.body)
	if (error) return res.status(400).send(error.details[0].message)

	let user = await User.findOne({ email: req.body.email })
	if (!user) return res.status(400).send('Invalid email or password')

	const isValidPassword = await bcrypt.compare(req.body.password, user.password)
	if (!isValidPassword) return res.status(400).send('Invalid email or password')

	const token = user.generateAuthToken()
	res.send(token);
}

const validateLogin = req => {
	const schema = {
		email: Joi.string().min(5).max(255).required().email(),
		password: Joi.string().min(5).max(1024).required()
	}

	return Joi.validate(req, schema)
}

const validateRegister = req => {
	const schema = {
		name: Joi.string().min(5).max(50).required(),
		email: Joi.string().min(5).max(255).required().email(),
		password: Joi.string().min(5).max(1024).required(),
		passwordConfirmation: Joi.string().min(5).max(1024).required().valid(Joi.ref('password'))
	}

	return Joi.validate(req, schema)
}

module.exports = {
    register,
    login
}