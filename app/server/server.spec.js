'use strict';

require('co-mocha');
var chai = require('chai');
var expect = chai.expect;
var request = require("co-request");

describe('jwt server auth', () => {
    var token;
    var email = `${Date.now()}@email.com`;
    var password = 'Passw0rd';

    it('can register and return a token', function *() {
        var loginResult = yield request({
            method: 'POST',
            url: 'http://localhost:3000/auth/register',
            body: {
                'email': email,
                'password': password
            },
            json: true,
            resolveWithFullResponse: true
        });

        token  = loginResult.body.token;

        expect(loginResult.statusCode).to.equal(200);
        expect(token).to.not.be.empty;
    });

    it('can login and return a token', function *() {
        var loginResult = yield request({
            method: 'POST',
            url: 'http://localhost:3000/auth/login',
            body: {
                'email': email,
                'password': password
            },
            json: true,
            resolveWithFullResponse: true
        });

        token  = loginResult.body.token;

        expect(loginResult.statusCode).to.equal(200);
        expect(token).to.not.be.empty;
    });

    it('can access secure endpoint with token', function* () {
        var secureResult = yield request({
            method: 'GET',
            url: 'http://localhost:3000/fixture',
            headers: {
                'Authorization': `${token}`
            },
            json: true,
            resolveWithFullResponse: true
        });

        expect(secureResult.statusCode).to.equal(200);
        expect(secureResult.body).to.equal(`hello ${ email }`);
    });

    it('can not access secure endpoint with invalid token', function* () {
        var secureResult = yield request({
            method: 'GET',
            url: 'http://localhost:3000/fixture',
            headers: {
                'Authorization': `not a token`
            },
            json: true,
            resolveWithFullResponse: true
        });

        expect(secureResult.statusCode).to.equal(401);
    });

    it('can access client app unauthenticated', function* () {
        var secureResult = yield request({
            method: 'GET',
            url: 'http://localhost:3000/',
            json: true,
            resolveWithFullResponse: true
        });

        expect(secureResult.statusCode).to.equal(200);
    })
});