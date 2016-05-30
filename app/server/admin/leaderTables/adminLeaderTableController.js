'use strict';

var leaderTablePositionCalculator = require('./leaderTablePositionCalculator');
var leaderTableSnapshotFactory = require('./leaderTableSnapshotFactory');
var ObjectID = require('mongodb').ObjectID;
var rounds = require('../../rounds/roundsConfig');
var predictionPointsCalculator = require('./pointsCalculator');

class AdminLeaderTableController {
    constructor(context, predictionRepository, fixtureRepository, userService, leaderTableService, wildcardService) {
        this.context = context;
        this.predictionRepository = predictionRepository || require('../../repository').Create('predictions');
        this.fixtureRepository = fixtureRepository || require('../../repository').Create('fixtures');
        this.userService = userService || require('../../repository').Create('users');
        this.leaderTableService = leaderTableService || require('../../repository').Create('leaderTableSnapshots');
        this.wildcardService = wildcardService || require('../../repository').Create('wildcards');
    }

    *createNewSnapshot() {
        var predictions = yield this.predictionRepository.find({});

        for(var prediction of predictions) {
            let fixture = yield this.fixtureRepository.findOne({ _id: new ObjectID(prediction.fixtureId) });
            let wildcard = yield this.wildcardService.findOne({ _id : new ObjectID(prediction.wildcardId) });

            prediction.points = predictionPointsCalculator(prediction, fixture, wildcard);

            yield this.predictionRepository.replaceOne(prediction._id, prediction);
        }

        for(var prediction of predictions) {
            let fixture = yield this.fixtureRepository.findOne({ _id: new ObjectID(prediction.fixtureId) });
            prediction.fixture = fixture;
            prediction.wildcard = yield this.wildcardService.findOne({ _id : new ObjectID(prediction.wildcardId) });
        }

        //create snapshots
        var users = yield this.userService.find({});
        var previousSnapshots = yield this.leaderTableService.find({});

        var leaderTableSnapshots = rounds
            .map(round => leaderTableSnapshotFactory(predictions, users, round._id, previousSnapshots));

        var overallSnapshot = leaderTableSnapshotFactory(predictions, users);

        leaderTableSnapshots.push(overallSnapshot);

        yield this.leaderTableService.insertMany(leaderTableSnapshots);
        this.context.status = 200;
    }
}

module.exports = AdminLeaderTableController;
