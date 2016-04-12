var Router = require('koa-router');
var authMiddleware = require('../auth/authMiddleware');

module.exports = Router({ prefix: '/fixtures' })
    .use(authMiddleware)
    .get('/', function *(next) {
        this.status = 200;
        this.body = this.fixtureService.findAll();

        yield next;
    })
    .routes();
