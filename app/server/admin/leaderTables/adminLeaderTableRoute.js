var Router = require('koa-router');
//var mongo = require('../../mongo');

var AdminLeaderTableController = require('./adminLeaderTableController');

// var PredictionService = require('../../predictions/predictionService');
// var FixtureService = require('../../fixtures/fixtureService');
// var RoundService = require('../../rounds/roundService');
// var UserService = require('../../users/userService');
// var LeaderTableService = require('../../leaderTables/leaderTableService');
// var WildcardService = require('../../wildcards/wildcardService');

module.exports = Router({ prefix: '/leaderTables' })
    .post('/', function *() {
        var controller = new AdminLeaderTableController(this);
        yield controller.createNewSnapshot();
    })
    .routes();
