var Router = require('koa-router');
var authMiddleware = require('../auth/authMiddleware');

var mongo = require('../mongo');
var FixtureService = require('./fixtureService');
var FixtureController = require('./fixtureController');

module.exports = Router({ prefix: '/fixtures' })
    .use(authMiddleware)
    .get('/', function *() {
        var fixtureController = new FixtureController(this, new FixtureService(mongo.db));
        yield fixtureController.findAll();
    })
    .routes();
