var Router = require('koa-router');
var authConfig = require('./authConfig');
var mongo = require('../mongo');

var UserService = require('../users/userService');
var AuthController = require('./authController');
var PredictionService = require('../predictions/predictionService');

module.exports = Router({ prefix: '/auth' })
    .post('/login', function *() {
        var controller = new AuthController(this, new UserService(mongo.db), new PredictionService(mongo.db));
        yield controller.login(this.request.body);
    })
    .post('/register', function *() {
        var controller = new AuthController(this, new UserService(mongo.db), new PredictionService(mongo.db));
        yield controller.register(this.request.body);
    })
    .get('/validate/email/:email', function *() {
        var controller = new AuthController(this, new UserService(mongo.db), new PredictionService(mongo.db));
        yield controller.emailExists(this.params);
    })
    .routes();