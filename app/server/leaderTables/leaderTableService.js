'use strict';

class LeaderTableService {
    constructor() {
        this.leaderTableSnapshots = require('../repository').Create('leaderTableSnapshots');
    }

    *getLatest(roundId) {
        var leaderTableSnapshots = yield this.leaderTableSnapshots
            .find({ roundId: roundId });

        var sortedLeaderTableSnapshots = leaderTableSnapshots
            .sort((a, b) => a.createdOn < b.createdOn ? 1 : -1);

        if(sortedLeaderTableSnapshots.length === 0)
            return null;

        return sortedLeaderTableSnapshots[0];
    }

    *getLatestOverall() {
        var leaderTableSnapshots = yield this.leaderTableSnapshots
            .find({ isOverall: true });

        var sortedLeaderTableSnapshots = leaderTableSnapshots
            .sort((a, b) => a.createdOn < b.createdOn ? 1 : -1);

        if(sortedLeaderTableSnapshots.length === 0)
            return null;

        return sortedLeaderTableSnapshots[0];
    }

    //TODO: remove use repo instead
    *insertAll(leaderTableSnapshots) {
        yield this.leaderTableSnapshots.insert(leaderTableSnapshots);
    }
}

module.exports = LeaderTableService;