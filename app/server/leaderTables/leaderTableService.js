'use strict';

class LeaderTableService {
    constructor(db) {
        this.leaderTableSnapshots = db.collection('leaderTableSnapshots');
    }

    *getLatest(roundId) {
        var leaderTableSnapshots = yield this.leaderTableSnapshots
            .find({ roundId: roundId}).toArray();

        var sortedLeaderTableSnapshots = leaderTableSnapshots
            .filter(s => s.roundId === roundId)
            .sort((a, b) => a.createdOn < b.createdOn);

        if(sortedLeaderTableSnapshots.length === 0)
            return null;

        return sortedLeaderTableSnapshots[0];
    }

    *insertAll(leaderTableSnapshots) {
        yield this.leaderTableSnapshots.insertMany(leaderTableSnapshots);
    }
}

module.exports = LeaderTableService;