var Router = require('koa-router');
var authMiddleware = require('../auth/authMiddleware');

var inject = require('../inject');

var userIdParamMapper = require('../mappers/userIdParamMapper')

module.exports = Router({ prefix: '/wildcards' })
    .use(authMiddleware)
    .get('/', inject('./wildcards/wildcardController', 'getWildcards', userIdParamMapper))
    .routes();