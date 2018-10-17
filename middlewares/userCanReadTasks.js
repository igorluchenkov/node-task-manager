module.exports = async (req, res, next) => {
	const { id } = req.params

	const userHasTasks = req.user.tasks.length

	if (!userHasTasks) {
		return res.status(403).send(`You have no tasks`)
	}

	next();
}