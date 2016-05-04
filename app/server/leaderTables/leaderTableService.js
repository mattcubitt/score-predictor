'use strict';

class LeaderTableService {
    constructor(db) {
        this.leaderTableSnapshots = db.collection('leaderTableSnapshots');
    }

    *getLatest(roundId) {
        var leaderTableSnapshots = yield this.leaderTableSnapshots
            .find({ roundId: roundId }).toArray();

        var sortedLeaderTableSnapshots = leaderTableSnapshots
            .sort((a, b) => a.createdOn < b.createdOn);

        if(sortedLeaderTableSnapshots.length === 0)
            return null;

        return sortedLeaderTableSnapshots[0];
    }

    *getLatestOverall() {
        var leaderTableSnapshots = yield this.leaderTableSnapshots
            .find({ isOverall: true }).toArray();

        var sortedLeaderTableSnapshots = leaderTableSnapshots
            .sort((a, b) => a.createdOn < b.createdOn);

        if(sortedLeaderTableSnapshots.length === 0)
            return null;

        return sortedLeaderTableSnapshots[0];
    }

    *insertAll(leaderTableSnapshots) {
        yield this.leaderTableSnapshots.insert(leaderTableSnapshots);
    }
}

module.exports = LeaderTableService;