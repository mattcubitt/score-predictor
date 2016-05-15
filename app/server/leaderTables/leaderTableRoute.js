var Router = require('koa-router');
var authMiddleware = require('../auth/authMiddleware');
var mongo = require('../mongo');
var LeaderTableService = require('../leaderTables/leaderTableService');
var LeaderTableController = require('./leaderTableController');

module.exports = Router({ prefix: '/leaderTables' })
    .use(authMiddleware)
    .get('/', function *() {
        var leaderTableController = new LeaderTableController(this,
                                        new LeaderTableService(mongo.db));
        yield leaderTableController.getLatest();
    })
    .routes();
