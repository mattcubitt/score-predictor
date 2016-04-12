var Router = require('koa-router');
var authMiddleware = require('../auth/authMiddleware');

module.exports = Router({ prefix: '/rounds' })
    .use(authMiddleware)
    .get('/', function *(next) {
        this.body = this.roundService.findAll();

        this.status = 200;
        yield next;
    })
    .routes();