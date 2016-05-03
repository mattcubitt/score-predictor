'use strict';

var pointsCalculator = require('../admin/leaderTables/pointsCalculator');

class UserController {
    constructor(context, predictionService) {
        this.context = context;
        this.currentUser = context.currentUser;
        this.predictionService = predictionService;
    }

    *getPoints(userId) {
        if(this.currentUser._id.toString() !== userId) {
            this.context.body = 'Forbidden';
            this.context.status = 403;
        } else {
            var userPredictions = yield this.predictionService.findByUserId(userId);

            var points = userPredictions
                .map(p => pointsCalculator(p, p.fixture))
                .reduce((p1, p2) => p1 + p2, 0);

            this.context.body = points;
            this.context.status = 200;
        }
    }
}

module.exports = UserController;