const express = require('express')
const router = express.Router()
const { Task, validateTask } = require('../models/Task')

router.get('/', async (req, res) => {
	const tasksList = await Task.find()
	res.send(tasksList)
})

router.get('/:id', async (req, res) => {
	const task = await Task.find({ _id: req.params.id })
	res.send(task)
})

router.post('/', async (req, res) => {
	const { error } = validateTask(req.body)
	if (error) return res.status(404).send({ error })
	
	const task = new Task(req.body)
	const tasksList = await task.save()
	res.send(tasksList);
});

router.put('/:id', async (req, res) => {
	const { error } = validateTask(req.body)
	if (error) return res.status(404).send({ error })

	const { id } = req.params
	const result = await Task.findOneAndUpdate(
		{ _id: id }, 
		req.body,
		{ new: true }
	)
	if (!result) return res.status(404).send({
		error: `Cannot find task with given ID: ${id}`
	})
  res.send(result);
});

router.delete('/:id', async (req, res) => {
	const { id } = req.params
	const result = await Task.findByIdAndRemove({ _id: id })

	if (!result) return res.status(404).send({
		error: `Cannot find task with given ID: ${id}` 
	})
  res.send(result);
});

module.exports = router