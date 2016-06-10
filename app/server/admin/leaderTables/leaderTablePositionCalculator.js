var leaderTableMovementCalculator = require('./leaderTableMovementCalculator');
var _ = require('lodash');

module.exports = function(userPoints, previousSnapshot) {
    var userPointsSorted = _.orderBy(userPoints,
        ['points', 'correctScores', 'correctResults'],
        ['desc', 'desc', 'desc']);

    var userPointsWithPositions = userPointsSorted
        .map((p, i) => {
            p.position = i + 1;
            return p;
        });

    var previousUserPoint;
    var positionCount = 1;
    for(var userPoint of userPointsWithPositions) {
        if(previousUserPoint) {
            if(previousUserPoint.points === userPoint.points &&
               previousUserPoint.correctScores === userPoint.correctScores &&
               previousUserPoint.correctResults === userPoint.correctResults) {
                userPoint.position = previousUserPoint.position;
                positionCount++
            } else {
                userPoint.position = ++positionCount;
            }
        }

        previousUserPoint = userPoint;
    }

    return userPointsWithPositions.map(userPoint => {
        var change = leaderTableMovementCalculator(userPoint, previousSnapshot);

        if(change !== null) {
            userPoint.change = change;
            return userPoint;
        }

        return userPoint;
    });
};