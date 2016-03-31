var Router = require('koa-router');
var authConfig = require('./authConfig');
var jwt = require('jsonwebtoken');
var userService = require('../user/userService');

module.exports = Router({ prefix: '/auth' })
    .post('/login', function *() {
        var params = this.request.body;
        var user = userService.find(params.email);

        if(user === null) {
            this.status = 404;
            this.body = 'Account not found';
        } else if(!userService.comparePassword(params.password, user.password)) {
            this.status = 409;
            this.body = 'Password incorrect';
        } else {
            var now = Math.floor(Date.now() / 1000);
            var oneDayExpiry = 60 * 60 * 24;
            var claims = {
                iss: authConfig.issuer,
                aud: authConfig.audience,
                email: params.email,
                exp: now + oneDayExpiry
            };

            var token = jwt.sign(claims, authConfig.privateKey);

            this.status = 200;
            this.body = { token: token };
        }
    })
    .post('/register', function *() {
        var params = this.request.body;
        var user = userService.find(params.email);

        if(user !== null) {
            this.status = 409;
            this.body = 'Email already registered';
        } else {
            userService.insert(params.email, params.password);

            var now = Math.floor(Date.now() / 1000);
            var oneDayExpiry = 60 * 60 * 24;
            var claims = {
                iss: authConfig.issuer,
                aud: authConfig.audience,
                email: params.email,
                exp: now + oneDayExpiry
            };

            var token = jwt.sign(claims, authConfig.privateKey);

            this.status = 200;
            this.body = { token: token };
        }
    })
    .get('/validate/email/:email', function *() {
        var user = userService.find(this.params.email);

        if(user === null) {
            this.status = 200;
        } else {
            this.status = 409;
            this.body = {
                email: 'Email is already registered'
            };
        }
    })
    .routes();