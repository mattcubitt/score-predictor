var Router = require('koa-router');
var authMiddleware = require('../auth/authMiddleware');

module.exports = Router({ prefix: '/fixture' })
    .use(authMiddleware)
    .get('/', function *() {
        this.status = 200;
        this.body = [{
            homeTeam: 'GER',
            homeScorePrediction: 3,
            homeScoreResult: 3,
            awayTeam: 'ENG',
            awayScorePrediction: 1,
            awayScoreResult: 1
        }];
    })
    .routes();
