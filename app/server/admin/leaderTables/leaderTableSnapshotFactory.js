'use strict';

var getLocalMoment = require('../../dateHelpers').GetLocalMoment;
var leaderTablePositionCalculator = require('./leaderTablePositionCalculator');

module.exports = (predictions, users, roundId) => {
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

    return {
        createdOn: getLocalMoment().toDate(),
        isOverall: roundId === undefined,
        roundId: roundId,
        userPoints: leaderTablePositionCalculator(userPoints)
    };
};
