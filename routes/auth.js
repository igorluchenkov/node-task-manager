const express = require('express')
const router = express.Router()
const Joi = require('joi')
const { User, validateUser } = require('../models/user')
const _ = require('lodash')
const bcrypt = require('bcryptjs')

router.post('/register', async (req, res) => {
	const { error } = validateUser(req.body)
	if (error) return res.status(400).send(error.details[0].message)

	let user = await User.findOne({ email: req.body.email })
	if (user) return res.status(400).send('User already registered')

	user = new User(_.pick(req.body, ['_id', 'name', 'email', 'password']))
	const salt = await bcrypt.genSalt(10)
	user.password = await bcrypt.hash(user.password, salt);
	await user.save()

	const token = user.generateAuthToken()
	res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
})

router.post('/login', async (req, res) => {
	const { error } = validateLogin(req.body)
	if (error) return res.status(400).send(error.details[0].message)

	let user = await User.findOne({ email: req.body.email })
	if (!user) return res.status(400).send('Invalid email or password')

	const isValidPassword = await bcrypt.compare(req.body.password, user.password)
	if (!isValidPassword) return res.status(400).send('Invalid email or password')

	const token = user.generateAuthToken()
	res.send(token);
})

const validateLogin = req => {
	const schema = {
		email: Joi.string().min(5).max(255).required().email(),
		password: Joi.string().min(5).max(1024).required()
	}

	return Joi.validate(req, schema)
}

module.exports = router