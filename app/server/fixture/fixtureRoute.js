var Router = require('koa-router');
var authMiddleware = require('../auth/authMiddleware');

module.exports = Router({ prefix: '/fixture' })
    .use(authMiddleware)
    .get('/', function *() {
        this.status = 200;
        this.body = `hello ${ this.user.email }`;
    })
    .routes();
