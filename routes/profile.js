const express = require('express')
const router = express.Router()
const { User } = require('../models/user')
const authToken = require('../middlewares/authToken')
const loggedUser = require('../middlewares/loggedUser')
const bcrypt = require('bcryptjs')

router.get('/', authToken, async (req, res) => {
	const user = await User.findById(req.user._id).select('-password')
	res.send(user)
})

router.put('/password', [authToken, loggedUser], async (req, res) => {
	const { newPassword } = req.body
	if (!newPassword) return res.status(400).send('"newPassword" is required.')

	const salt = await bcrypt.genSalt(10)
	user.password = await bcrypt.hash(newPassword, salt);
	await user.save()
	
	const token = req.header('x-auth-token')
	res.send(token);
})

router.put('/name', [authToken, loggedUser], async (req, res) => {
	const { newName } = req.body
	if (!newName) return res.status(400).send('"name" is required.')

	user.name = newName
	await user.save()

	const token = req.header('x-auth-token')
	res.send(token);
})

router.put('/email', [authToken, loggedUser], async (req, res) => {
	const { newEmail } = req.body
	if (!newEmail) return res.status(400).send('"newEmail" is required.')

	user.email = newEmail
	await user.save()

	const token = req.header('x-auth-token')
	res.send(token);
})

module.exports = router