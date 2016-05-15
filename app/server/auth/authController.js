'use strict';

var authConfig = require('./authConfig');
var jwt = require('jsonwebtoken');
var pointsCalculator = require('../admin/leaderTables/pointsCalculator');

class AuthController {
    constructor(context, userService, predictionService) {
        this.context = context;
        this.userService = userService;
        this.predictionService = predictionService;
    }

    *login(loginRequest) {
        var user = yield this.userService.find(loginRequest.email);

        if(user === null) {
            this.context.status = 404;
            this.context.body = 'Account not found';
        } else if(!this.userService.comparePassword(loginRequest.password, user.password)) {
            this.context.status = 409;
            this.context.body = 'Password incorrect';
        } else {
            var now = Math.floor(Date.now() / 1000);
            var oneDayExpiry = 60 * 60 * 24;
            var claims = {
                iss: authConfig.issuer,
                aud: authConfig.audience,
                email: loginRequest.email,
                exp: now + oneDayExpiry
            };

            var token = jwt.sign(claims, authConfig.privateKey);

            var points = yield this.userService.getTotalPoints(user._id);

            this.context.status = 200;
            this.context.body = {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: token,
                points: points,
                state: 1
            };
        }
    }

    *register(registerRequest){
        var user = yield this.userService.find(registerRequest.email);

        if(user !== null) {
            this.context.status = 409;
            this.context.body = 'Email already registered';
        } else {
            yield this.userService.insert(registerRequest.name, registerRequest.email, registerRequest.password);

            var now = Math.floor(Date.now() / 1000);
            var oneDayExpiry = 60 * 60 * 24;
            
            var claims = {
                iss: authConfig.issuer,
                aud: authConfig.audience,
                email: registerRequest.email,
                exp: now + oneDayExpiry
            };

            var token = jwt.sign(claims, authConfig.privateKey);

            var user = yield this.userService.find(registerRequest.email);

            this.context.status = 200;
            this.context.body = {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: token,
                state: 1,
                points: 0
            };
        }
    }

    *emailExists(emailExistsRequest){
        var user = yield this.userService.find(emailExistsRequest.email);

        if(user === null) {
            this.context.status = 200;
        } else {
            this.context.status = 409;
            this.context.body = {
                email: 'Email is already registered'
            };
        }
    }
}

module.exports = AuthController;