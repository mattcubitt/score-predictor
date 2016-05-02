'use strict';

var userPointsCalculator = require('./userPointsCalculator');
var getLocalMoment = require('../../dateHelpers').GetLocalMoment;
var leaderTablePositionCalculator = require('./leaderTablePositionCalculator');
var leaderTableSnapshotFactory = require('./leaderTableSnapshotFactory');

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
            .map(round => leaderTableSnapshotFactory(predictions, users, round._id));

        var overallSnapshot = leaderTableSnapshotFactory(predictions, users);

        leaderTableSnapshots.push(overallSnapshot);

        this.leaderTableService.insertAll(leaderTableSnapshots);
        this.context.status = 200;
    }
}

module.exports = AdminLeaderTableController;
