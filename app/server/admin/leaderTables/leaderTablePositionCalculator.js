module.exports = function(userPoints) {
    var userPointsWithPositions = userPoints
        .sort((a, b) => a.points < b.points ? 1 : -1)
        .map((p, i) => {
            p.position = i + 1;
            return p;
        });

    var previousUserPoint;
    var positionCount = 1;
    for(var userPoint of userPointsWithPositions) {
        if(previousUserPoint) {
            if(previousUserPoint.points === userPoint.points) {
                userPoint.position = previousUserPoint.position;
                positionCount++
            } else {
                userPoint.position = ++positionCount;
            }
        }

        previousUserPoint = userPoint;
    }

    return userPointsWithPositions;
};