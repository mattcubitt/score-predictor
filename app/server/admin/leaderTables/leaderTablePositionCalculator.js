module.exports = function(userPoints) {
    return userPoints
        .sort((a, b) => a.points < b.points ? 1 : -1)
        .map((p, i) => {
            p.position = i + 1;
            return p;
        });
};