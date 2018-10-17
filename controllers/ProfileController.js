const { User } = require('../models/user')
const bcrypt = require('bcryptjs')
const Mailer = require('../helpers/mailer')

const getInfo = async (req, res) => {
	const user = await User.findById(req.user._id).select('-password')
	res.send(user)
}

const changePassword = async (req, res) => {
	const { newPassword } = req.body
	if (!newPassword) return res.status(400).send('"newPassword" is required.')

	const salt = await bcrypt.genSalt(10)
	user.password = await bcrypt.hash(newPassword, salt);
	await user.save()
	
	const token = req.header('x-auth-token')
	res.send(token);
}

const changeName = async (req, res) => {
	const { newName } = req.body
	if (!newName) return res.status(400).send('"name" is required.')

	user.name = newName
	await user.save()

	const token = req.header('x-auth-token')
	res.send(token);
}

const changeEmail = async (req, res) => {
	const { newEmail } = req.body
	if (!newEmail) return res.status(400).send('"newEmail" is required.')

	user.email = newEmail
	await user.save()

	const mail = await Mailer.sendMail({
		to: req.body.email,
		subject: 'Your email was changed!',
		text: `Dear ${user.name}
		You have successfully changed your account's email to ${newEmail}`
	})

	mail
	.then(console.log)
	.catch(console.error)

	const token = req.header('x-auth-token')
	res.send(token);
}

const forgetPassword = async (req, res) => {
	const { email } = req.body
	if (!email) return res.status(400).send('"email" is required.')

	const user = User.find({ email })
	if (!user) return res.status(400).send('Invalid email.')

	await Mailer.sendMail({ 
		to: email,
		subject: 'Password recovery!',
		text: 'Hey! Want some password recovery? ...'
	})

	res.send('Email was successfully sent!');
}

module.exports = {
    getInfo,
    changePassword,
    changeName,
    changeEmail,
    forgetPassword
}