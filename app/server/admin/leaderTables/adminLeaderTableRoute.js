var Router = require('koa-router');
var mongo = require('../../mongo');

var AdminLeaderTableController = require('./adminLeaderTableController');

var PredictionService = require('../../predictions/predictionService');
var FixtureService = require('../../fixtures/fixtureService');
var RoundService = require('../../rounds/roundService');
var UserService = require('../../users/userService');
var LeaderTableService = require('../../leaderTables/leaderTableService');

module.exports = Router({ prefix: '/leaderTables' })
    .post('/', function *() {
        var controller = new AdminLeaderTableController(this, new PredictionService(mongo.db),
                                                              new FixtureService(mongo.db),
                                                              new RoundService(mongo.db),
                                                              new UserService(mongo.db),
                                                              new LeaderTableService(mongo.db));
        yield controller.createNewSnapshot();
    })
    .routes();
