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

        var expectedPoints = {
            correctResult: false,
            correctScore: true,
            points: 3
        };

        expect(points).to.deep.equal(expectedPoints);
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

        var expectedPoints = {
            correctResult: false,
            correctScore: true,
            points: 9
        };

        expect(points).to.deep.equal(expectedPoints);
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

        var expectedPoints = {
            correctResult: true,
            correctScore: false,
            points: 3
        };

        expect(points).to.deep.equal(expectedPoints);
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

        var expectedPoints = {
            correctResult: false,
            correctScore: true,
            points: 9
        };

        expect(points).to.deep.equal(expectedPoints);
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

        var expectedPoints = {
            correctResult: false,
            correctScore: false,
            points: 3
        };

        expect(points).to.deep.equal(expectedPoints);
    });

    it('calculates 9 points for a correct score plus 6 goals with goals points wildcard', function *() {
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

        var expectedPoints = {
            correctResult: false,
            correctScore: true,
            points: 9
        };

        expect(points).to.deep.equal(expectedPoints);
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

        var expectedPoints = {
            correctResult: true,
            correctScore: false,
            points: 1
        };

        expect(points).to.deep.equal(expectedPoints);
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

        var expectedPoints = {
            correctResult: true,
            correctScore: false,
            points: 1
        };

        expect(points).to.deep.equal(expectedPoints);
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

        var expectedPoints = {
            correctResult: false,
            correctScore: false,
            points: 0
        };

        expect(points).to.deep.equal(expectedPoints);
    });

    it('calculates 0 points when there are no results', function *() {
        var prediction = {
            homeScore: 0,
            awayScore: 0
        };

        var fixture = { };

        var points = pointsCalculator(prediction, fixture);

        var expectedPoints = {
            correctResult: false,
            correctScore: false,
            points: 0
        };

        expect(points).to.deep.equal(expectedPoints);
    });

    it('calculates 0 points when there is no prediction', function *() {
        var prediction = { };

        var fixture = {
            homeScore: 0,
            awayScore: 0
        };

        var points = pointsCalculator(prediction, fixture);

        var expectedPoints = {
            correctResult: false,
            correctScore: false,
            points: 0
        };

        expect(points).to.deep.equal(expectedPoints);
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

        var expectedPoints = {
            correctResult: false,
            correctScore: false,
            points: 0
        };

        expect(points).to.deep.equal(expectedPoints);
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

        var expectedPoints = {
            correctResult: false,
            correctScore: false,
            points: 0
        };

        expect(points).to.deep.equal(expectedPoints);
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

        var expectedPoints = {
            correctResult: false,
            correctScore: false,
            points: 6
        };

        expect(points).to.deep.equal(expectedPoints);
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

        var expectedPoints = {
            correctResult: true,
            correctScore: false,
            points: 8
        };

        expect(points).to.deep.equal(expectedPoints);
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

        var expectedPoints = {
            correctResult: true,
            correctScore: false,
            points: 1
        };

        expect(points).to.deep.equal(expectedPoints);
    });

    it('when fixture scores are undefined should return zero points', function *() {
        var wildcard = {
            type: 'goals-points'
        };

        var prediction = {
            homeScore: 1,
            awayScore: 1
        };

        var fixture = {
            homeScore: undefined,
            awayScore: undefined
        };

        var points = pointsCalculator(prediction, fixture, wildcard);

        var expectedPoints = {
            correctResult: false,
            correctScore: false,
            points: 0
        };

        expect(points).to.deep.equal(expectedPoints);
    });
});