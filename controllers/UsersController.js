const { User, validateUser } = require('../models/user')

const getList = async (req, res) => {
	const users = await User.find().select('_id, name, email')
	if (!users) return res.status(400).send('Cannot get any user, collection is empty.')
	
	res.send(users)
}

const get = async (req, res) => {
	const user = await User.findById(req.params.id).select('_id, name, email')
	if (!user) return res.status(400).send(`Cannot get user with given ID: ${id}.`)
	
	res.send(user)
}

const add = async (req, res) => {
	const { error } = validateUser(req.body)
	if (error) return res.status(400).send(error.details[0].message)
	
	const user = new User(req.body)
	await user.save()

	const token = user.generateAuthToken()
	res.header('x-auth-token', token).send(user)
}

const put = async (req, res) => {
	const { error } = validateUser(req.body)
	if (error) return res.status(400).send(error.details[0].message)

	const { id } = req.params
	const result = await User.findOneAndUpdate(
		{ _id: id }, 
		req.body,
		{ new: true }
	)

	if (!result) return res.status(400).send(`Cannot find user with given ID: ${id}.`)
  res.send(result)
}

const remove = async (req, res) => {
	const { id } = req.params
	const result = await User.findByIdAndRemove(id)

	if (!result) return res.status(400).send(`Cannot find user with given ID: ${id}.`)

  res.send(result)
}

module.exports = {
    getList,
	get,
	add,
    put,
    remove
}