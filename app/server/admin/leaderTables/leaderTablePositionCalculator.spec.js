'use strict';

require('co-mocha');
var chai = require('chai');
var expect = chai.expect;

var leaderTablePositionCalculator = require('./leaderTablePositionCalculator');

describe('leaderTablePositionCalculator', () => {
    it('calculates correct leader table position', function *() {
        var userPoints = [{
            name: 'matt',
            points: 99
        }, {
            name: 'aloke',
            points: 50
        }];

        var actualUserPoints = leaderTablePositionCalculator(userPoints);

        var exceptedUserPoints = [{
            name: 'matt',
            position: 1,
            points: 99
        }, {
            name: 'aloke',
            position: 2,
            points: 50
        }];

        expect(actualUserPoints).to.deep.equal(exceptedUserPoints)
    });

    it('calculates correct leader table position from live data', function *() {
        var userPoints = [
            {
                "userId": "571fdcab77c58603009e2e60",
                "name": "Matt",
                "points": 6
            },
            {
                "userId": "5728d1f7d8e4f303005feb5b",
                "name": "Wing",
                "points": 6
            },
            {
                "userId": "572b06dc2ecb430300b389ae",
                "name": "Aloke",
                "points": 12
            },
            {
                "userId": "573f102924c6fd03005e08e3",
                "name": "Mason",
                "points": 0
            },
            {
                "userId": "573f103f24c6fd03005e097d",
                "name": "Ady",
                "points": 0
            },
            {
                "userId": "573f108324c6fd03005e09e4",
                "name": "Andrew Smith",
                "points": 4
            },
            {
                "userId": "573f109724c6fd03005e0adc",
                "name": "Anthony",
                "points": 0
            },
            {
                "userId": "573f15c524c6fd03005e12f2",
                "name": "David H",
                "points": 8
            },
            {
                "userId": "573f19c624c6fd03005e1481",
                "name": "Peter",
                "points": 12
            },
            {
                "userId": "573f19d224c6fd03005e1519",
                "name": "Jason",
                "points": 0
            },
            {
                "userId": "57430f1ee832b703007ee13a",
                "name": "mr_road",
                "points": 0
            }
        ];

        var actualUserPoints = leaderTablePositionCalculator(userPoints);

        var exceptedUserPoints = [
            {
                "name": "Aloke",
                "points": 12,
                "position": 1,
                "userId": "572b06dc2ecb430300b389ae"
            },
            {
                "name": "Peter",
                "points": 12,
                "position": 1,
                "userId": "573f19c624c6fd03005e1481"
            },
            {
                "name": "David H",
                "points": 8,
                "position": 3,
                "userId": "573f15c524c6fd03005e12f2"
            },
            {
                "name": "Matt",
                "points": 6,
                "position": 4,
                "userId": "571fdcab77c58603009e2e60"
            },
            {
                "name": "Wing",
                "points": 6,
                "position": 4,
                "userId": "5728d1f7d8e4f303005feb5b"
            },
            {
                "name": "Andrew Smith",
                "points": 4,
                "position": 6,
                "userId": "573f108324c6fd03005e09e4"
            },
            {
                "name": "Anthony",
                "points": 0,
                "position": 7,
                "userId": "573f109724c6fd03005e0adc"
            },
            {
                "name": "Ady",
                "points": 0,
                "position": 7,
                "userId": "573f103f24c6fd03005e097d"
            },
            {
                "name": "Mason",
                "points": 0,
                "position": 7,
                "userId": "573f102924c6fd03005e08e3"
            },
            {
                "name": "Jason",
                "points": 0,
                "position": 7,
                "userId": "573f19d224c6fd03005e1519"
            },
            {
                "name": "mr_road",
                "points": 0,
                "position": 7,
                "userId": "57430f1ee832b703007ee13a"
            }
        ];

        expect(actualUserPoints).to.deep.equal(exceptedUserPoints)
    });

    it('repeats number when points are the same', function *() {
        var userPoints = [{
            name: 'matt',
            points: 99
        }, {
            name: 'aloke',
            points: 99
        }];

        var actualUserPoints = leaderTablePositionCalculator(userPoints);

        var exceptedUserPoints = [{
            name: 'matt',
            position: 1,
            points: 99
        }, {
            name: 'aloke',
            position: 1,
            points: 99
        }];

        expect(actualUserPoints).to.deep.equal(exceptedUserPoints)
    });

    it('skips when number is repeated', function *() {
        var userPoints = [{
            name: 'matt',
            points: 99
        }, {
            name: 'aloke',
            points: 99
        }, {
            name: 'wing',
            points: 10
        }, {
            name: 'pete',
            points: 10
        }, {
            name: 'ant',
            points: 1
        }];

        var actualUserPoints = leaderTablePositionCalculator(userPoints);

        var exceptedUserPoints = [{
            name: 'matt',
            position: 1,
            points: 99
        }, {
            name: 'aloke',
            position: 1,
            points: 99
        }, {
            name: 'wing',
            position: 3,
            points: 10
        }, {
            name: 'pete',
            position: 3,
            points: 10
        }, {
            name: 'ant',
            position: 5,
            points: 1
        }];

        expect(actualUserPoints).to.deep.equal(exceptedUserPoints)
    });
});