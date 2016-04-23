var Router = require('koa-router');
var authMiddleware = require('../auth/authMiddleware');
var adminMiddleware = require('./adminMiddleware');
var adminFixtureRoute = require('./fixtures/adminFixtureRoute');
var adminLeaderTableRoute = require('./leaderTables/adminLeaderTableRoute');

module.exports = Router({ prefix: '/admin' })
    .use(authMiddleware)
    .use(adminMiddleware)
    .use(adminFixtureRoute)
    .use(adminLeaderTableRoute)
    .routes();
