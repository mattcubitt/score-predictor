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
    var correctScore = false;
    var correctResult = false;

    if(prediction.homeScore == null || prediction.awayScore == null) {
        points = 0;
    } else if(fixture.homeScore == null || fixture.awayScore == null) {
        points = 0;
    } else if(prediction.homeScore === fixture.homeScore &&
        prediction.awayScore === fixture.awayScore) {
        points = 3;
        correctScore = true;
    } else if(resultTypeCalculator(prediction) === resultTypeCalculator(fixture)) {
        points = 1;
        correctResult = true;
    }

    if(!wildcard) {
        return {
            correctScore: correctScore,
            correctResult: correctResult,
            points: points
        };
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
        return {
            points: 0,
            correctScore: false,
            correctResult: false
        };
    }

    return {
        correctScore: correctScore,
        correctResult: correctResult,
        points: points
    };
};

module.exports = pointsCalculator;