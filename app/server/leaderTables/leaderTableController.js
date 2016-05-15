'use strict';

var rounds = require('../rounds/roundsConfig');

class LeaderTableController {
    constructor(context, leaderTableService) {
        this.context = context;
        this.leaderTableService = leaderTableService;
    }

    *getLatest() {
        var latestRoundTables = [];
        for(var round of rounds) {
            var latestRoundTable = yield this.leaderTableService.getLatest(round._id);

            if(latestRoundTable != null) {
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