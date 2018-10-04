module.exports = (req, res, next) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send('Invalid email or password.')

    const isValidPassword = await bcrypt.compare(req.body.password, user.password)
    if (!isValidPassword) return res.status(400).send('Invalid email or password.')
    
    next()
}