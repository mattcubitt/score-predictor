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

    var claims;

    try {
        claims = jwt.verify(token, authConfig.privateKey, options);
    } catch(ex) {
        this.status = 403;
        this.body = 'Forbidden';
    }

    var currentUser = yield new UserService(mongo.db).find(claims.email);

    this.currentUser = {
        _id: currentUser._id,
        email: currentUser.email,
        name: currentUser.name,
        role: currentUser.role
    };

    yield next;
};