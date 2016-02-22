'use strict';

var fs = require('fs');
var koa = require('koa');
var jwt = require('koa-jwt');
var serve = require('koa-static');
var bodyParser = require('koa-bodyparser');
var router = require('koa-router')({
    prefix: '/api'
});

var app = koa();

app.use(serve('.'));
app.use(bodyParser());

var publicKey = fs.readFileSync('demo.rsa.pub');
var privateKey = fs.readFileSync('demo.rsa');

app.use(function *(next) {
    try {
        yield next; //Attempt to go through the JWT Validator
    } catch(e) {
        if (e.status == 401 ) {
            // Prepare response to user.
            this.status = e.status;
            this.body = 'You don\'t have a signed token dude :('
        } else {
            throw e; // Pass the error to the next handler since it wasn't a JWT error.
        }
    }
});

app.use(function *(next) {
    if (this.url.match(/^\/login/)) {
        var claims = this.request.body;
        var token = jwt.sign(claims, privateKey, {algorithm: 'RS256'});
        this.status = 200;
        this.body = {token: token};
    } else {
        yield next;
    }
});

app.use(jwt({
    secret: publicKey,
    algorithm: 'RS256'
}));

var fixtures = [{
    homeTeam: {
        fullName: 'Germany',
        shortName: 'GER'
    },
    awayTeam: {
        fullName: 'England',
        shortName: 'ENG'
    }
}, {
    homeTeam: {
        fullName: 'Italy',
        shortName: 'ITA'
    },
    awayTeam: {
        fullName: 'Spain',
        shortName: 'SPA'
    }
}, {
    homeTeam: {
        fullName: 'Germany',
        shortName: 'GER'
    },
    awayTeam: {
        fullName: 'Spain',
        shortName: 'SPA'
    }
}];

router.get('/fixtures', function* (next) {
    this.body = fixtures;

    yield next;
});

router.post('/fixtures', function* (next) {
    var fixture = this.request.body;

    fixtures.push(fixture);

    this.body = fixture;

    yield next;
});

app.use(router.routes());

app.listen(3333);