'use strict';

var pointsCalculator = require('./predictionPointsCalculator');
var getLocalMoment = require('../../dateHelpers').GetLocalMoment;
var leaderTablePositionCalculator = require('./leaderTablePositionCalculator');

class AdminLeaderTableController {
    constructor(context, predictionService, fixtureService, roundService, userService, leaderTableService) {
        this.context = context;
        this.predictionService = predictionService;
        this.fixtureService = fixtureService;
        this.roundService = roundService;
        this.userService = userService;
        this.leaderTableService = leaderTableService;
    }

    *createNewSnapshot() {
        var predictions = yield this.predictionService.findAll();

        for(var prediction of predictions) {
            prediction.fixture = yield this.fixtureService.find(prediction.fixtureId);
        }

        var rounds = yield this.roundService.findAll();
        var users = yield this.userService.findAll();

        var leaderTableSnapshots = rounds
            .map(round => {
                var userPoints = users
                    .map(user => {
                        var points = predictions
                            .filter(p => p.userId === user._id && p.fixture.roundId === round._id)
                            .map(p => pointsCalculator(p, p.fixture))
                            .reduce((p1, p2) => p1 + p2, 0);

                        return {
                            userId: user._id,
                            name: user.name,
                            points: points
                        }
                    });

                return {
                    createdOn: getLocalMoment().toDate(),
                    roundId: round._id,
                    userPoints: leaderTablePositionCalculator(userPoints)
                }
            });

        this.leaderTableService.insertAll(leaderTableSnapshots);
        this.context.status = 200;
    }
}

module.exports = AdminLeaderTableController;
