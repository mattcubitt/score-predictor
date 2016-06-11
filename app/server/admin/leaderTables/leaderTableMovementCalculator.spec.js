'use strict';

require('co-mocha');
var chai = require('chai');
var expect = chai.expect;

var leaderTableMovementCalculator = require('./leaderTableMovementCalculator');

describe('leaderTableMovementCalculator', () => {
    it('calculates position movement from previous snapshots', function *() {
        var userPoint = {
            "userId": "5728d1f7d8e4f303005feb5b",
            "name": "Wing",
            "points": 99,
            "position": 1
        };

        var previousSnapshot = {
            "_id": {
                "$oid": "5743fca78c7a36c025db1712"
            },
            "createdOn": {
                "$date": "2016-05-24T07:03:03.878Z"
            },
            "isOverall": true,
            "roundId": null,
            "userPoints": [
                {
                    "userId": "572b06dc2ecb430300b389ae",
                    "name": "Aloke",
                    "points": 12,
                    "position": 1
                },
                {
                    "userId": "573f19c624c6fd03005e1481",
                    "name": "Peter",
                    "points": 12,
                    "position": 2
                },
                {
                    "userId": "573f15c524c6fd03005e12f2",
                    "name": "David H",
                    "points": 8,
                    "position": 3
                },
                {
                    "userId": "571fdcab77c58603009e2e60",
                    "name": "Matt",
                    "points": 6,
                    "position": 4
                },
                {
                    "userId": "5728d1f7d8e4f303005feb5b",
                    "name": "Wing",
                    "points": 6,
                    "position": 5
                },
                {
                    "userId": "573f108324c6fd03005e09e4",
                    "name": "Andrew Smith",
                    "points": 4,
                    "position": 6
                },
                {
                    "userId": "573f109724c6fd03005e0adc",
                    "name": "Anthony",
                    "points": 0,
                    "position": 7
                },
                {
                    "userId": "573f103f24c6fd03005e097d",
                    "name": "Ady",
                    "points": 0,
                    "position": 8
                },
                {
                    "userId": "573f102924c6fd03005e08e3",
                    "name": "Mason",
                    "points": 0,
                    "position": 9
                },
                {
                    "userId": "573f19d224c6fd03005e1519",
                    "name": "Jason",
                    "points": 0,
                    "position": 10
                },
                {
                    "userId": "57430f1ee832b703007ee13a",
                    "name": "mr_road",
                    "points": 0,
                    "position": 11
                }
            ]
        };

        var actualChange = leaderTableMovementCalculator(userPoint, previousSnapshot);

        var expectedChange = 4;

        expect(expectedChange).to.be.equal(actualChange)
    })

    it('calculates position movement as 0 for new user not in previous snapshot', function *() {
        var userPoint = {
            "userId": "some_new_id",
            "name": "new guy"
        };

        var previousSnapshot = {
            "_id": {
                "$oid": "5743fca78c7a36c025db1712"
            },
            "createdOn": {
                "$date": "2016-05-24T07:03:03.878Z"
            },
            "isOverall": true,
            "roundId": null,
            "userPoints": [
                {
                    "userId": "572b06dc2ecb430300b389ae",
                    "name": "Aloke",
                    "points": 12,
                    "position": 1
                },
                {
                    "userId": "573f19c624c6fd03005e1481",
                    "name": "Peter",
                    "points": 12,
                    "position": 2
                },
                {
                    "userId": "573f15c524c6fd03005e12f2",
                    "name": "David H",
                    "points": 8,
                    "position": 3
                },
                {
                    "userId": "571fdcab77c58603009e2e60",
                    "name": "Matt",
                    "points": 6,
                    "position": 4
                },
                {
                    "userId": "5728d1f7d8e4f303005feb5b",
                    "name": "Wing",
                    "points": 6,
                    "position": 5
                },
                {
                    "userId": "573f108324c6fd03005e09e4",
                    "name": "Andrew Smith",
                    "points": 4,
                    "position": 6
                },
                {
                    "userId": "573f109724c6fd03005e0adc",
                    "name": "Anthony",
                    "points": 0,
                    "position": 7
                },
                {
                    "userId": "573f103f24c6fd03005e097d",
                    "name": "Ady",
                    "points": 0,
                    "position": 8
                },
                {
                    "userId": "573f102924c6fd03005e08e3",
                    "name": "Mason",
                    "points": 0,
                    "position": 9
                },
                {
                    "userId": "573f19d224c6fd03005e1519",
                    "name": "Jason",
                    "points": 0,
                    "position": 10
                },
                {
                    "userId": "57430f1ee832b703007ee13a",
                    "name": "mr_road",
                    "points": 0,
                    "position": 11
                }
            ]
        };

        var actualChange = leaderTableMovementCalculator(userPoint, previousSnapshot);

        var expectedChange = 0;

        expect(expectedChange).to.be.equal(actualChange)
    });
});