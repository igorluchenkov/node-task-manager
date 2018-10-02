const config = require('config')

module.exports = function () {
	if (!config.has('jwtPrivateKey')) {
		throw new Error('jwtPrivateKey is not defined')
	}
}