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
            points: points,
            bonusPoints: 0
        };
    }

    var bonusPoints = 0;

    switch(wildcard.type) {
        case 'clean-sheet-points':
            if(fixture.homeScore === 0) {
                bonusPoints += 3;
            }

            if(fixture.awayScore === 0) {
                bonusPoints += 3;
            }
            break;
        case 'goals-points':
            bonusPoints = fixture.homeScore + fixture.awayScore;
            break;
        case 'triple-points':
            bonusPoints = (points * 3) - points;
            break;
        case 'penalty-points':
            bonusPoints = fixture.homePenalties + fixture.awayPenalties;
            break;
    }

    points += bonusPoints;

    if(isNaN(points)) {
        return {
            points: 0,
            bonusPoints: 0,
            correctScore: false,
            correctResult: false
        };
    }

    return {
        correctScore: correctScore,
        correctResult: correctResult,
        bonusPoints: bonusPoints,
        points: points
    };
};

module.exports = pointsCalculator;