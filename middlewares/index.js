const userCanManageTask = require('./userCanManageTask')
const userCanReadTasks = require('./userCanReadTasks')
const userIsLogged = require('./userIsLogged')
const userHasAuthToken = require('./userHasAuthToken')
const userIsAdmin = require('./userIsAdmin')

module.exports = {
    userCanManageTask,
    userCanReadTasks,
    userHasAuthToken,
    userIsAdmin,
    userIsLogged
}