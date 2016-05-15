'use strict';

require('co-mocha');
var chai = require('chai');
var expect = chai.expect;
var pointsCalculator = require('./pointsCalculator');

describe('predictionPointsCalculator', function() {
    it('calculates 3 points for a correct score and result', function *() {
        var prediction = {
            homeScore: 1,
            awayScore: 1
        };

        var fixture = {
            homeScore: 1,
            awayScore: 1
        };

        var points = pointsCalculator(prediction, fixture);

        expect(points).to.be.equal(3);
    });

    it('calculates 9 points for a correct score and result with x3 wildcard', function *() {
        var wildcard = {
            type: 'triple-points'
        };

        var prediction = {
            homeScore: 1,
            awayScore: 1
        };

        var fixture = {
            homeScore: 1,
            awayScore: 1
        };

        var points = pointsCalculator(prediction, fixture, wildcard);

        expect(points).to.be.equal(9);
    });

    it('calculates 3 points for a correct result with x3 wildcard', function *() {
        var wildcard = {
            type: 'triple-points'
        };

        var prediction = {
            homeScore: 0,
            awayScore: 0
        };

        var fixture = {
            homeScore: 1,
            awayScore: 1
        };

        var points = pointsCalculator(prediction, fixture, wildcard);

        expect(points).to.be.equal(3);
    });

    it('calculates 9 points for a correct 0 - 0 draw with clean sheet wildcard', function *() {
        var wildcard = {
            type: 'clean-sheet-points'
        };

        var prediction = {
            homeScore: 0,
            awayScore: 0
        };

        var fixture = {
            homeScore: 0,
            awayScore: 0
        };

        var points = pointsCalculator(prediction, fixture, wildcard);

        expect(points).to.be.equal(9);
    });

    it('calculates 3 points for a incorrect 0 - 0 draw with clean sheet wildcard', function *() {
        var wildcard = {
            type: 'clean-sheet-points'
        };

        var prediction = {
            homeScore: 0,
            awayScore: 0
        };

        var fixture = {
            homeScore: 0,
            awayScore: 1
        };

        var points = pointsCalculator(prediction, fixture, wildcard);

        expect(points).to.be.equal(3);
    });

    it('calculates 9 points for a correct result plus 6 goals with goals points wildcard', function *() {
        var wildcard = {
            type: 'goals-points'
        };

        var prediction = {
            homeScore: 3,
            awayScore: 3
        };

        var fixture = {
            homeScore: 3,
            awayScore: 3
        };

        var points = pointsCalculator(prediction, fixture, wildcard);

        expect(points).to.be.equal(9);
    });

    it('calculates 1 points for a correct result and no goals with goals points wildcard', function *() {
        var wildcard = {
            type: 'goals-points'
        };

        var prediction = {
            homeScore: 3,
            awayScore: 3
        };

        var fixture = {
            homeScore: 0,
            awayScore: 0
        };

        var points = pointsCalculator(prediction, fixture, wildcard);

        expect(points).to.be.equal(1);
    });

    it('calculates 1 points for a correct result', function *() {
        var prediction = {
            homeScore: 0,
            awayScore: 0
        };

        var fixture = {
            homeScore: 1,
            awayScore: 1
        };

        var points = pointsCalculator(prediction, fixture);

        expect(points).to.be.equal(1);
    });

    it('calculates 0 points for a incorrect score and result', function *() {
        var prediction = {
            homeScore: 0,
            awayScore: 0
        };

        var fixture = {
            homeScore: 1,
            awayScore: 2
        };

        var points = pointsCalculator(prediction, fixture);

        expect(points).to.be.equal(0);
    });

    it('calculates 0 points when there are no results', function *() {
        var prediction = {
            homeScore: 0,
            awayScore: 0
        };

        var fixture = { };

        var points = pointsCalculator(prediction, fixture);

        expect(points).to.be.equal(0);
    });

    it('calculates 0 points when there is no prediction', function *() {
        var prediction = { };

        var fixture = {
            homeScore: 0,
            awayScore: 0
        };

        var points = pointsCalculator(prediction, fixture);

        expect(points).to.be.equal(0);
    });

    it('calculates 0 points when predictions are null', function *() {
        var prediction = {
            homeScore: null,
            awayScore: null
        };

        var fixture = {
            homeScore: 0,
            awayScore: 0
        };

        var points = pointsCalculator(prediction, fixture);

        expect(points).to.be.equal(0);
    });

    it('calculates 0 points when home prediction is correct but the other is undefined', function *() {
        var prediction = {
            homeScore: 0
        };

        var fixture = {
            homeScore: 0,
            awayScore: 0
        };

        var points = pointsCalculator(prediction, fixture);

        expect(points).to.be.equal(0);
    });

    it('calculates 6 points when home prediction is correct but the other is undefined and clean sheet wildcard is selected', function *() {
        var wildcard = {
            type: 'clean-sheet-points'
        };

        var prediction = {
            homeScore: 0
        };

        var fixture = {
            homeScore: 0,
            awayScore: 0
        };

        var points = pointsCalculator(prediction, fixture, wildcard);

        expect(points).to.be.equal(6);
    });

    it('calculates 8 points for a correct result and 7 penalties with the penalty points wildcard', function *() {
        var wildcard = {
            type: 'penalty-points'
        };

        var prediction = {
            homeScore: 1,
            awayScore: 1
        };

        var fixture = {
            homeScore: 0,
            awayScore: 0,
            homePenalties: 3,
            awayPenalties: 4
        };

        var points = pointsCalculator(prediction, fixture, wildcard);

        expect(points).to.be.equal(8);
    });

    it('calculates 1 points for a correct result and no penalties with the penalty points wildcard', function *() {
        var wildcard = {
            type: 'penalty-points'
        };

        var prediction = {
            homeScore: 1,
            awayScore: 1
        };

        var fixture = {
            homeScore: 0,
            awayScore: 0
        };

        var points = pointsCalculator(prediction, fixture, wildcard);

        expect(points).to.be.equal(1);
    });
});