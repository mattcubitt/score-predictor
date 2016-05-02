'use strict';

var userPointsCalculator = require('./userPointsCalculator');
var getLocalMoment = require('../../dateHelpers').GetLocalMoment;
var leaderTablePositionCalculator = require('./leaderTablePositionCalculator');

module.exports = (predictions, users, roundId) => {
    var userPoints = users
        .map(user => userPointsCalculator(predictions, user, roundId));

    return {
        createdOn: getLocalMoment().toDate(),
        isOverall: roundId === undefined,
        userPoints: leaderTablePositionCalculator(userPoints)
    };
};
