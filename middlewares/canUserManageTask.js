module.exports = async (req, res, next) => {
	const { id } = req.params

	const canUserChangeTask = req.user.tasks
		.filter(task => !task.readonly && task.id.toString() === id)
		.length > 0 

	if (!canUserChangeTask) {
		return res.status(403).send(`You cannot delete task with given ID: ${id}`)
	}

	next();
}