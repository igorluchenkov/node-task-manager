const { Task, validateTask } = require('../models/task')
const { User } = require('../models/user')

const getList = async (req, res) => {
	const tasksList = await Task.find()

	const userTasks = []
	req.user.tasks.forEach(task => {
		const taskIndex = tasksList.findIndex(el => {
			return el._id.toString() === task.id.toString()
		})
		if (taskIndex !== -1) {
			userTasks.push(tasksList[taskIndex])
		}
	})

	res.send(userTasks)
}

const get = async (req, res) => {
	const task = await Task.find({ _id: req.params.id })
	if (!task) return res.status(400).send('Cannot get task with given id.')
	
	const taskIndex = req.user.tasks.findIndex(task => task.id.toString() === req.params.id)
	if (taskIndex === -1) {
		return res.status(403).send(`You cannot read this task`)
	}

	res.send(task)
}

const add = async (req, res) => {
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
	res.send(token);
}

const put = async (req, res) => {
	const { error } = validateTask(req.body)
	if (error) return res.status(400).send(error.details[0].message)

	const { id } = req.params
	const result = await Task.findOneAndUpdate(
		{ _id: id }, 
		req.body,
		{ new: true }
	)

	if (!result) return res.status(400).send({
		error: `Cannot find task with given ID: ${id}.`
	})
  res.send(result);
}

const remove = async (req, res) => {
	const { id } = req.params
	const result = await Task.findByIdAndRemove({ _id: id })

	if (!result) return res.status(400).send({
		error: `Cannot find task with given ID: ${id}.` 
	})

	const index = req.user.tasks.findIndex(task => task.id.toString() === id)
	req.user.tasks.splice(index, 1)
	await req.user.save()

  res.send(result);
}

const share = async (req, res) => {
	const { id } = req.params
	const task = await Task.find({ _id: id })
	if (!task) return res.status(400).send('Cannot get task with given id.')
	
	const index = req.user.tasks.findIndex(task => task.id.toString() === id)
	if (index === -1) return res.status(403).send(`You cannot share this task`)

	const { shareOptions } = req.body
	if (!shareOptions) return res.status(400).send(`"shareOptions" is required`)

	shareOptions.forEach(async ({ id, readonly }) => {
		const user = await User.findById({ _id: id })
		user.tasks.push({
			id: req.params.id,
			readonly
		})

		await user.save()
	})
	res.send(task)
}

module.exports = {
    getList,
    get,
    add,
    put,
    remove,
    share
}