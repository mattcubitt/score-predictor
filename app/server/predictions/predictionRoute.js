var Router = require('koa-router');
var authMiddleware = require('../auth/authMiddleware');

var mongo = require('../mongo');
var FixtureService = require('../fixtures/fixtureService');
var PredictionService = require('../predictions/predictionService');
var PredictionController = require('./predictionController');
var WildcardService = require('../wildcards/wildcardService');

module.exports = Router({ prefix: '/predictions' })
    .use(authMiddleware)
    .get('/', function *() {
        var predictionController = new PredictionController(this,
                                            new FixtureService(mongo.db),
                                            new PredictionService(mongo.db),
                                            new WildcardService());
        yield predictionController.findAll();
    })
    .post('/', function *() {
        var predictionController = new PredictionController(this,
                                            new FixtureService(mongo.db),
                                            new PredictionService(mongo.db),
                                            new WildcardService());
        yield predictionController.saveAll(this.request.body);
    })
    .post('/:predictionId/wildcards', function *() {
        var predictionController = new PredictionController(this,
            new FixtureService(mongo.db),
            new PredictionService(mongo.db),
            new WildcardService());
        yield predictionController.addWildcard(this.params.predictionId, this.request.body);
    })
    .delete('/:predictionId/wildcards', function *() {
        var predictionController = new PredictionController(this,
            new FixtureService(mongo.db),
            new PredictionService(mongo.db),
            new WildcardService());
        yield predictionController.deleteWildcard(this.params.predictionId, this.request.body);
    })
    .routes();