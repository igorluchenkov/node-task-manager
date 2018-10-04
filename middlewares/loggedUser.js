module.exports = (req, res, next) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send('Invalid email or password.')

    const isValidPassword = await bcrypt.compare(req.body.password, user.password)
    if (!isValidPassword) return res.status(400).send('Invalid email or password.')
    
    next()
}

function validate (req) {
	const schema = {
		email: Joi.string().min(5).max(255).required().email(),
		password: Joi.string().min(5).max(1024).required(),
		newPassword: Joi.string().min(5).max(1024),
		newName: Joi.string().min(5).max(50),
		newEmail: Joi.string().min(5).max(255).email()
	}

	return Joi.validate(req, schema)
}