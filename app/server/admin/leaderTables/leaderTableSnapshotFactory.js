'use strict';

var getLocalMoment = require('../../dateHelpers').GetLocalMoment;
var leaderTablePositionCalculator = require('./leaderTablePositionCalculator');
var leaderTableMovementCalculator = require('./leaderTableMovementCalculator');

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

            var correctScores = userPredictions
                .filter(p => p.correctScore === true)
                .length;

            var correctResults = userPredictions
                .filter(p => p.correctResult === true)
                .length;

            return {
                userId: user._id,
                external: user.external,
                name: user.name,
                points: points,
                correctScores: correctScores,
                correctResults: correctResults
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