var resultTypeCalculator = function(result) {
    if(result.homeScore > result.awayScore) {
        return 'homeWin';
    } else if(result.homeScore < result.awayScore) {
        return 'awayWin';
    }

    return 'draw';
};

var predictionPointsCalculator = function(prediction, fixture) {
    if(!fixture.homeScore || !fixture.awayScore) {
        return 0;
    } else if(prediction.homeScore === fixture.homeScore &&
        prediction.awayScore === fixture.awayScore) {
        return 3;
    } else if(resultTypeCalculator(prediction) === resultTypeCalculator(fixture)) {
        return 1;
    }

    return 0;
};

module.exports = predictionPointsCalculator;