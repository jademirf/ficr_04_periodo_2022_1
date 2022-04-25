
module.exports = (app) => {
    const userControllers = require('../controllers/user-controllers')

    app.route('/signin')
        .post(userControllers.signin)
    
    
    app.route('/users')
        .get(userControllers.list)
}