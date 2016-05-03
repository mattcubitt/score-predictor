var Router = require('koa-router');
var authMiddleware = require('../auth/authMiddleware');

var mongo = require('../mongo');
var UserController = require('./userController');
var PredictionService = require('../predictions/predictionService');

module.exports = Router({ prefix: '/users' })
    .use(authMiddleware)
    .get('/:userId/points', function *() {
        var predictionController = new UserController(this, new PredictionService(mongo.db));
        yield predictionController.getPoints(this.request.params.userId);
    })
    .routes();