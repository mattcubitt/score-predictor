var Router = require('koa-router');
var authMiddleware = require('../auth/authMiddleware');

var inject = require('../inject');

module.exports = Router({ prefix: '/rounds' })
    .use(authMiddleware)
    .get('/', inject('./rounds/roundController', 'findAll'))
    .get('/:roundId/wildcards/', inject('./wildcards/wildcardController', 'getWildcards'))
    .routes();