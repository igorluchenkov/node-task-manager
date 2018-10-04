const express = require('express')
const router = express.Router()
const { User } = require('../models/user')
const auth = require('../middlewares/auth')
const loggedUserAccess = require('../middlewares/loggedUserAccess')
const bcrypt = require('bcryptjs')
const Joi = require('joi')

router.get('/', auth, async (req, res) => {
	const user = await User.findById(req.user._id).select('-password')
	res.send(user)
})

router.put('/password', [auth, loggedUserAccess], async (req, res) => {
	const { newPassword } = req.body
	if (!newPassword) return res.status(400).send('"newPassword" is required.')

	const salt = await bcrypt.genSalt(10)
	user.password = await bcrypt.hash(newPassword, salt);
	await user.save()
	
	const token = req.header('x-auth-token')
	res.send(token);
})

router.put('/name', [auth, loggedUserAccess], async (req, res) => {
	const { newName } = req.body
	if (!newName) return res.status(400).send('"name" is required.')

	user.name = newName
	await user.save()

	const token = req.header('x-auth-token')
	res.send(token);
})

router.put('/email', [auth, loggedUserAccess], async (req, res) => {
	const { newEmail } = req.body
	if (!newEmail) return res.status(400).send('"newEmail" is required.')

	user.email = newEmail
	await user.save()

	const token = req.header('x-auth-token')
	res.send(token);
})

function validate (req) {
	const schema = {
		email: Joi.string().min(5).max(255).required().email(),
		password: Joi.string().min(5).max(1024).required(),
		newPassword: Joi.string().min(5).max(1024),
		newName: Joi.string().min(5).max(50),
		newEmail: Joi.string().min(5).max(255).email()
	}

	return Joi.validate(req, schema)
}

module.exports = router