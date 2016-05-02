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

            if(latestRoundTable !== null) {
                latestRoundTables.push(latestRoundTable);
            }
        }

        var latestOverallTable = yield this.leaderTableService.getLatestOverall();

        if(latestOverallTable !== null) {
            latestRoundTables.push(latestOverallTable);
        }

        this.context.body = latestRoundTables;
        this.context.status = 200;
     }
}

module.exports = LeaderTableController;