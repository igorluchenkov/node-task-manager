const express = require('express')
const router = express.Router()
const { User, validateUser } = require('../models/user')
const userHasAuthToken = require('../middlewares/userHasAuthToken')
const userIsAdmin = require('../middlewares/userIsAdmin')

router.get('/', userHasAuthToken, async (req, res) => {
	const users = await User.find().select('_id, name, email')
	if (!users) return res.status(400).send('Cannot get any user, collection is empty.')
	
	res.send(users)
})

router.get('/:id', userHasAuthToken, async (req, res) => {
	const user = await User.findById(req.params.id).select('_id, name, email')
	if (!user) return res.status(400).send(`Cannot get user with given ID: ${id}.`)
	
	res.send(user)
})

router.put('/:id', [userHasAuthToken, userIsAdmin], async (req, res) => {
	const { error } = validateUser(req.body)
	if (error) return res.status(400).send(error.details[0].message)

	const { id } = req.params
	const result = await User.findOneAndUpdate(
		{ _id: id }, 
		req.body,
		{ new: true }
	)

	if (!result) return res.status(400).send(`Cannot find user with given ID: ${id}.`)
  res.send(result);
});

router.patch('/:id', [userHasAuthToken, userIsAdmin], async (req, res) => {
	const { id } = req.params

	const user = await User.findById(id)
	if (!user) return res.status(400).send(`Cannot find user with given ID: ${id}.`)

	user = {
		...task,
		...req.body
	}
	
	await user.save()

  res.send(user);
})

router.delete('/:id', [userHasAuthToken, userIsAdmin], async (req, res) => {
	const { id } = req.params
	const result = await User.findByIdAndRemove(id)

	if (!result) return res.status(400).send(`Cannot find user with given ID: ${id}.`)

  res.send(result);
});

module.exports = router