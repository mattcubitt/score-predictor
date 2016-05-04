'use strict';

var pointsCalculator = require('./pointsCalculator');

module.exports = (predictions, user, roundId) => {
    var userPredictions = predictions.filter(p => p.userId.toString() === user._id.toString());

    if(roundId !== undefined) {
        userPredictions = userPredictions
            .filter(p => p.fixture.roundId === roundId);
    }

    var points = userPredictions
        .map(p => pointsCalculator(p, p.fixture))
        .reduce((p1, p2) => p1 + p2, 0);

    return {
        userId: user._id,
        name: user.name,
        points: points
    }
};
