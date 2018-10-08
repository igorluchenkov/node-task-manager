const express = require('express')
const router = express.Router()
const { User } = require('../models/user')
const userHasAuthToken = require('../middlewares/userHasAuthToken')
const userIsAdmin = require('../middlewares/userIsAdmin')

router.get('/', userHasAuthToken, async (req, res) => {
  const users = await User.find()
  // test
	res.send(users)
})

router.get('/:id', userHasAuthToken, async (req, res) => {
	const user = await User.find({ _id: req.params.id })
	if (!user) return res.status(400).send('Cannot get user with given id.')
	
	res.send(user)
})

router.post('/', [userHasAuthToken, userIsAdmin], async (req, res) => {
	const { error } = validateTask(req.body)
	if (error) return res.status(400).send(error.details[0].message)
	
	const task = new Task(req.body)
	await task.save()

	const user = await User.findById(req.user._id)
	user.tasks.push({
		id: task._id,
		readonly: false
	})
	await user.save()

	const token = user.generateAuthToken()
	res.header('x-auth-token', token).send(task);
});

router.put('/:id', [userHasAuthToken, userIsAdmin], async (req, res) => {
	const { error } = validateTask(req.body)
	if (error) return res.status(400).send(error.details[0].message)

	const { id } = req.params
	const result = await Task.findOneAndUpdate(
		{ _id: id }, 
		req.body,
		{ new: true }
	)

	if (!result) return res.status(400).send({
		error: `Cannot find task with given ID: ${id}`
	})
  res.send(result);
});

router.patch('/:id', [userHasAuthToken, userIsAdmin], async (req, res) => {
	const { error } = validateTask(req.body)
	if (error) return res.status(400).send(error.details[0].message)

	const { id } = req.params

	const task = await Task.findById({ _id: id })
	if (!task) return res.status(400).send(`Cannot find task with given ID: ${id}`)

	task = {
		...task,
		...req.body
	}
	
	await task.save()

  res.send(task);
})

router.delete('/:id', [userHasAuthToken, userIsAdmin], async (req, res) => {
	const { id } = req.params
	const result = await Task.findByIdAndRemove({ _id: id })

	if (!result) return res.status(400).send({
		error: `Cannot find task with given ID: ${id}` 
	})

	const index = req.user.tasks.findIndex(task => task.id.toString() === id)
	req.user.tasks.splice(index, 1)
	await req.user.save()

  res.send(result);
});

module.exports = router