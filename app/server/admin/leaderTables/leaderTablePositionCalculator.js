module.exports = function(userPoints) {
    return userPoints
        .sort((a, b) => a.points < b.points)
        .map((p, i) => {
            p.position = i + 1;
            return p;
        });
};