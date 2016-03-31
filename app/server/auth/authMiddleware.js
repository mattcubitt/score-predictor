var authConfig = require('./authConfig');
var jwt = require('jsonwebtoken');
var userService = require('../user/userService');

module.exports = function*(next){
    try {
        var token = this.request.header.authorization;

        var options = {
            audience: authConfig.audience,
            issuer: authConfig.issuer
        };

        var claims = jwt.verify(token, authConfig.privateKey, options);

        this.user = userService.find(claims.email);

        yield next;

    } catch(ex) {
        this.status = 401;
        this.body = 'Unauthorized';
    }
};