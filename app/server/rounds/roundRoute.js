var Router = require('koa-router');
var authMiddleware = require('../auth/authMiddleware');

var mongo = require('../mongo');
var RoundService = require('./roundService');
var RoundController = require('./roundController');

var inject = require('../inject');

module.exports = Router({ prefix: '/rounds' })
    .use(authMiddleware)
    .get('/', function *() {
        var roundController = new RoundController(this, new RoundService(mongo.db));
        yield roundController.findAll();
    })
    .get('/:roundId/wildcards/', inject('./wildcards/wildcardController', 'getWildcards'))
    .routes();