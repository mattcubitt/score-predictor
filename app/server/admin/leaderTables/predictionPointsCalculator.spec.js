'use strict';

require('co-mocha');
var chai = require('chai');
var expect = chai.expect;
var predictionPointsCalculator = require('./predictionPointsCalculator');

describe('predictionPointsCalculator', () => {
    it('calculates 3 points for a correct score and result', function *() {
        var prediction = {
            homeScore: 1,
            awayScore: 1
        };

        var fixture = {
            homeScore: 1,
            awayScore: 1
        };

        var points = predictionPointsCalculator(prediction, fixture);

        expect(points).to.be.equal(3);
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

        var points = predictionPointsCalculator(prediction, fixture);

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

        var points = predictionPointsCalculator(prediction, fixture);

        expect(points).to.be.equal(0);
    });

    it('calculates 0 points when there are no results', function *() {
        var prediction = {
            homeScore: 0,
            awayScore: 0
        };

        var fixture = { };

        var points = predictionPointsCalculator(prediction, fixture);

        expect(points).to.be.equal(0);
    });
});