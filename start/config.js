const config = require('config')

module.exports = () => {
	const configRequirements = [
		'jwtPrivateKey',
		'db',
		'mailAccountData'
	]

	configRequirements.forEach(requirement => {
		if (!config.has(requirement)) {
			throw new Error(`${requirement} is not defined in config`)
		}
	})
}