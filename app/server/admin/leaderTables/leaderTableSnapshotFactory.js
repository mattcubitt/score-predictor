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

            return {
                userId: user._id,
                name: user.name,
                points: points
            }
        });

    previousSnapshots = previousSnapshots || [];

    var previousSnapshot = previousSnapshots
        .filter(s => s.roundId === roundId)
        .sort((a, b) => a.createdOn > b.createdOn ? 1 : -1)[0];

    return {
        createdOn: getLocalMoment().toDate(),
        isOverall: roundId === undefined,
        roundId: roundId,
        userPoints: leaderTablePositionCalculator(userPoints, previousSnapshot)
    };
};