var sinon = require('sinon');
require('sinon-as-promised');

module.exports = {
    roundService: (rounds) => {
        var roundService = sinon.createStubInstance(require('./rounds/roundService'));
        roundService.findAll.resolves(rounds);

        return roundService;
    },
    leaderTableService: (rounds, leaderTables) => {
        var leaderTableService = sinon.createStubInstance(require('./leaderTables/leaderTableService'));

        var i = 0;
        for(var round of rounds) {
            leaderTableService.getLatest.withArgs(round._id).resolves(leaderTables[i]);
            i++;
        }

        return leaderTableService;
    }
}
