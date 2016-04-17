var Router = require('koa-router');
var authMiddleware = require('../auth/authMiddleware');
var adminMiddleware = require('./adminMiddleware');
var adminFixtureRoute = require('./fixtures/adminFixtureRoute');

module.exports = Router({ prefix: '/admin' })
    .use(authMiddleware)
    .use(adminMiddleware)
    .use(adminFixtureRoute)
    .routes();
