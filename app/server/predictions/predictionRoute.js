var Router = require('koa-router');
var authMiddleware = require('../auth/authMiddleware');

module.exports = Router({ prefix: '/predictions' })
    .use(authMiddleware)
    .get('/', function *() {
        this.status = 200;
        this.body = this.predictions.find(this.currentUser.userId);
    })
    .routes();
