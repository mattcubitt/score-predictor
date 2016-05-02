var resultTypeCalculator = function(result) {
    if(result.homeScore > result.awayScore) {
        return 'homeWin';
    } else if(result.homeScore < result.awayScore) {
        return 'awayWin';
    }

    return 'draw';
};

var pointsCalculator = function(prediction, fixture) {
    if(prediction.homeScore === undefined || prediction.awayScore === undefined) {
        return 0;
    } else if(fixture.homeScore === undefined || fixture.awayScore === undefined) {
        return 0;
    } else if(prediction.homeScore === fixture.homeScore &&
        prediction.awayScore === fixture.awayScore) {
        return 3;
    } else if(resultTypeCalculator(prediction) === resultTypeCalculator(fixture)) {
        return 1;
    }

    return 0;
};

module.exports = pointsCalculator;