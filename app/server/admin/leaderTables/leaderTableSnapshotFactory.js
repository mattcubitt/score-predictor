'use strict';

var getLocalMoment = require('../../dateHelpers').GetLocalMoment;
var leaderTablePositionCalculator = require('./leaderTablePositionCalculator');
var isFixtureEditable = require('../../fixtures/isFixtureEditable');

module.exports = (predictions, users, roundId, previousSnapshots) => {
    var userPoints = users
        .map(user => {
            var userPredictions = predictions.filter(p => p.userId.toString() === user._id.toString());

            if(roundId !== undefined) {
                userPredictions = userPredictions
                    .filter(p => p.fixture.roundId === roundId);
            }

            var points = userPredictions
                .map(p => p.points)
                .reduce((p1, p2) => p1 + p2, 0);

            var bonusPoints = userPredictions
                .map(p => p.bonusPoints)
                .reduce((p1, p2) => p1 + p2, 0);

            var correctScores = userPredictions
                .filter(p => p.correctScore === true)
                .length;

            var correctResults = userPredictions
                .filter(p => p.correctResult === true)
                .length;

            var cleanSheetsWildcardCount = userPredictions
                .filter(p => p.wildcard && p.wildcard.type === 'clean-sheet-points' && isFixtureEditable(p.fixture) === false)
                .length;

            var goalsPointsWildcardCount = userPredictions
                .filter(p => p.wildcard && p.wildcard.type === 'goals-points' && isFixtureEditable(p.fixture) === false)
                .length;

            var triplePointsWildcardCount = userPredictions
                .filter(p => p.wildcard && p.wildcard.type === 'triple-points' && isFixtureEditable(p.fixture) === false)
                .length;

            var penaltyPointsWildcardCount = userPredictions
                .filter(p => p.wildcard && p.wildcard.type === 'penalty-points' && isFixtureEditable(p.fixture) === false)
                .length;

            return {
                userId: user._id,
                external: user.external,
                name: user.name,
                points: points,
                bonusPoints: bonusPoints,
                correctScores: correctScores,
                correctResults: correctResults,
                cleanSheetsWildcardCount: cleanSheetsWildcardCount,
                goalsPointsWildcardCount: goalsPointsWildcardCount,
                triplePointsWildcardCount: triplePointsWildcardCount,
                penaltyPointsWildcardCount: penaltyPointsWildcardCount
            }
        });

    previousSnapshots = previousSnapshots || [];

    var previousSnapshot = previousSnapshots
        .filter(s => s.roundId === roundId)
        .sort((a, b) => a.createdOn < b.createdOn ? 1 : -1)[0];

    return {
        createdOn: getLocalMoment().toDate(),
        isOverall: roundId === undefined,
        roundId: roundId,
        userPoints: leaderTablePositionCalculator(userPoints, previousSnapshot)
    };
};