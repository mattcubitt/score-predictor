module.exports = function(userPoint, previousSnapshot) {
    if(!previousSnapshot) {
        return null;
    }

    var previousUserPoint = previousSnapshot.userPoints
        .filter(u => u.userId.toString() === userPoint.userId.toString())[0];

    if(previousUserPoint === undefined) {
        return 0;
    }

    var change = previousUserPoint.position - userPoint.position;

    return change;
};