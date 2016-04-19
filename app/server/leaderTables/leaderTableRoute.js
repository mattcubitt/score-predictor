var Router = require('koa-router');
var authMiddleware = require('../auth/authMiddleware');

module.exports = Router({ prefix: '/leaderTables' })
    .use(authMiddleware)
    .get('/', function *(next) {
        this.status = 200;
        var rounds = this.roundService.findAll();

        this.body = rounds
            .map(round => this.leaderTableService.getLatest(round._id));

        yield next;
    })
    .routes();
