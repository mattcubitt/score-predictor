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
});