const express = require('express')
const router = express.Router()
const { User } = require('../models/user')
const auth = require('../middlewares/auth')
const bcrypt = require('bcryptjs')
const Joi = require('joi')

router.get('/', auth, async (req, res) => {
	const user = await User.findById(req.user._id).select('-password')
	res.send(user)
})

router.put('/password', auth, async (req, res) => {
	const { error } = validate(req.body)
	if (error) return res.status(400).send(error.details[0].message)

	let user = await User.findOne({ email: req.body.email })
	if (!user) return res.status(400).send('Invalid email or password.')

	const isValidPassword = await bcrypt.compare(req.body.password, user.password)
	if (!isValidPassword) return res.status(400).send('Invalid email or password.')

	const { newPassword } = req.body
	if (!newPassword) return res.status(400).send('"newPassword" is required.')

	const salt = await bcrypt.genSalt(10)
	user.password = await bcrypt.hash(newPassword, salt);
	await user.save()
	
	const token = user.generateAuthToken()
	res.send(token);
})

function validate (req) {
	const schema = {
		email: Joi.string().min(5).max(255).required().email(),
		password: Joi.string().min(5).max(1024).required(),
		newPassword: Joi.string().min(5).max(1024)
	}

	return Joi.validate(req, schema)
}

module.exports = router