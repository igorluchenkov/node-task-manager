const express = require('express')
const router = express.Router()
const { User } = require('../models/user')
const auth = require('../middlewares/auth')

router.get('/', auth, async (req, res) => {
	const user = await User.findById(req.user._id).select('-password')
	res.send(user)
})

module.exports = router