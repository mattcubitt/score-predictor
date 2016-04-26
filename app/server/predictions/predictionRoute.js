var Router = require('koa-router');
var authMiddleware = require('../auth/authMiddleware');

var mongo = require('../mongo');
var FixtureService = require('../fixtures/fixtureService');
var PredictionService = require('../predictions/predictionService');
var PredictionController = require('./predictionController');

module.exports = Router({ prefix: '/predictions' })
    .use(authMiddleware)
    .get('/', function *() {
        var predictionController = new PredictionController(this,
                                            new FixtureService(mongo.db),
                                            new PredictionService(mongo.db));
        yield predictionController.findAll();
    })
    .post('/', function *() {
        var predictionController = new PredictionController(this,
                                            new FixtureService(mongo.db),
                                            new PredictionService(mongo.db));
        yield predictionController.saveAll(this.request.body);
    })
    .routes();