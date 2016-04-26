'use strict';

class LeaderTableController {
    constructor(context, roundService, leaderTableService) {
        this.context = context;
        this.roundService = roundService;
        this.leaderTableService = leaderTableService;
    }

    *getLatest() {
        var rounds = yield this.roundService.findAll();

        var latestRoundTables = [];
        for(var round of rounds) {
            var latestRoundTable = yield this.leaderTableService.getLatest(round._id);
            latestRoundTables.push(latestRoundTable);
        }

        this.context.body = latestRoundTables;
        this.context.status = 200;
     }
}

module.exports = LeaderTableController;