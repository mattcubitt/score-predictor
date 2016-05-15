var resultTypeCalculator = function(result) {
    if(result.homeScore > result.awayScore) {
        return 'homeWin';
    } else if(result.homeScore < result.awayScore) {
        return 'awayWin';
    }

    return 'draw';
};

var pointsCalculator = function(prediction, fixture, wildcard) {
    prediction = prediction || {};
    fixture = fixture || {};
    
    fixture.homePenalties = fixture.homePenalties || 0;
    fixture.awayPenalties = fixture.awayPenalties || 0;

    var points = 0;

    if(prediction.homeScore == null || prediction.awayScore == null) {
        points = 0;
    } else if(fixture.homeScore == null || fixture.awayScore == null) {
        points = 0;
    } else if(prediction.homeScore === fixture.homeScore &&
        prediction.awayScore === fixture.awayScore) {
        points = 3;
    } else if(resultTypeCalculator(prediction) === resultTypeCalculator(fixture)) {
        points = 1;
    }

    if(!wildcard) {
        return points;
    }

    switch(wildcard.type) {
        case 'clean-sheet-points':
            if(fixture.homeScore === 0) {
                points = points + 3;
            }

            if(fixture.awayScore === 0) {
                points = points + 3;
            }
            break;
        case 'goals-points':
            points = points + (fixture.homeScore + fixture.awayScore);
            break;
        case 'triple-points':
            points = points * 3;
            break;
        case 'penalty-points':
            points = points + (fixture.homePenalties + fixture.awayPenalties);
            break;
    }

    if(isNaN(points)) {
        debugger;
    }

    return points;
};

module.exports = pointsCalculator;