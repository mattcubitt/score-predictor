var sinon = require('sinon');
require('sinon-as-promised');

module.exports = {
    leaderTableService: (rounds, leaderTables, overallLeaderTable) => {
        var leaderTableService = sinon.createStubInstance(require('./leaderTables/leaderTableService'));

        var i = 0;
        for(var round of rounds) {
            leaderTableService.getLatest.withArgs(round._id).resolves(leaderTables[i]);
            i++;
        }

        leaderTableService.getLatestOverall.resolves(overallLeaderTable);

        return leaderTableService;
    }
};