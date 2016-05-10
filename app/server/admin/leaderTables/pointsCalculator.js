var resultTypeCalculator = function(result) {
    if(result.homeScore > result.awayScore) {
        return 'homeWin';
    } else if(result.homeScore < result.awayScore) {
        return 'awayWin';
    }

    return 'draw';
};

var pointsCalculator = function(prediction, fixture) {
    prediction = prediction || {};
    fixture = fixture || {};

    var points = 0;

    if(prediction.homeScore === undefined || prediction.awayScore === undefined) {
        points = 0;
    } else if(fixture.homeScore === undefined || fixture.awayScore === undefined) {
        points = 0;
    } else if(prediction.homeScore === fixture.homeScore &&
        prediction.awayScore === fixture.awayScore) {
        points = 3;
    } else if(resultTypeCalculator(prediction) === resultTypeCalculator(fixture)) {
        points = 1;
    }

    if(!prediction.wildcard) {
        return points;
    }

    switch(prediction.wildcard.type) {
        case 'clean-sheet-points':
            if(fixture.homeScore === 0) {
                points =+ 3;
            }

            if(fixture.awayScore === 0) {
                points =+ 3;
            }
        case 'goals-points':
            points =+ (fixture.homeScore + fixture.awayScore);
        case 'triple-points':
            points =+ (points * 3);
        case 'penalty-points':
            points =+ (fixture.homePenalties + fixture.awayPenalties);
    }

    return points;
};

module.exports = pointsCalculator;