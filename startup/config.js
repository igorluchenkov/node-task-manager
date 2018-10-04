const config = require('config')

module.exports = () => {
	if (!config.has('jwtPrivateKey')) {
		throw new Error('jwtPrivateKey is not defined')
	}
}