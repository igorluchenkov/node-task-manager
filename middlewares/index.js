const userCanManageTask = require('./userCanManageTask')
const userIsLogged = require('./userIsLogged')
const userHasAuthToken = require('./userHasAuthToken')
const userIsAdmin = require('./userIsAdmin')

module.exports = {
    userCanManageTask,
    userHasAuthToken,
    userIsAdmin,
    userIsLogged
}