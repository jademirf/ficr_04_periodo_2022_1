const authenticate = require('../middlewares/auth')
module.exports = (app) => {
    const userControllers = require('../controllers/user-controllers')

    app.route('/signin')
        .post(userControllers.signin)
    
    
    app.route('/users')
        .get(authenticate, userControllers.list)
        .post(userControllers.createUser)
    
    app.route('/users/:userId')
        .get(userControllers.show)
}