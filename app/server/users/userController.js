'use strict';

var pointsCalculator = require('../admin/leaderTables/pointsCalculator');
var LeaderTableService = require('../leaderTables/leaderTableService')

class UserController {
    constructor(context, predictionService, leaderTableService) {
        this.context = context;
        this.currentUser = context.currentUser;
        this.predictionService = predictionService;
        this.leaderTableService = leaderTableService || new LeaderTableService();
    }

    *getPoints(userId) {
        var currentUserId = this.currentUser._id.toString();

        if(currentUserId !== userId) {
            this.context.body = 'Forbidden';
            this.context.status = 403;
        } else {
            var latestOverallTable = yield this.leaderTableService.getLatestOverall();

            var userPoints = latestOverallTable.userPoints.filter(p => p._id.toString() === currentUserId);

            if(userPoints.length > 0) {
                this.context.body = userPoints[0].points;
                this.context.status = 200;
            } else {
                this.context.body = 0;
                this.context.status = 200;
            }
        }
    }
}

module.exports = UserController;