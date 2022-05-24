// import middleware de autenticação
const authenticate = require('../middlewares/auth')

module.exports = (app) => {
    const userControllers = require('../controllers/user-controllers')

    app.route('/signin')
        .post(userControllers.signin)
    
    
    app.route('/users')
        // adicionando middleware nas rotas que queremos proteger
        .get(authenticate, userControllers.list)
        .post(userControllers.createUser)
    
    app.route('/users/:userId')
        .get(authenticate, userControllers.show)
}