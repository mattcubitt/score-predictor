var authConfig = require('./authConfig');
var jwt = require('jsonwebtoken');
var mongo = require('../mongo');
var UserService = require('../users/userService');

module.exports = function*(next){
    var token = this.request.header.authorization;

    var options = {
        audience: authConfig.audience,
        issuer: authConfig.issuer
    };

    var claims = jwt.verify(token, authConfig.privateKey, options);

    this.currentUser = new UserService(mongo.db).find(claims.email);

    yield next;
};