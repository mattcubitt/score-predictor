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
        //TODO: remove
        try {
            console.log('creating new snapshot');

            var predictions = yield this.predictionRepository.find({});
            var fixtures = yield this.fixtureRepository.find({});
            var wildcards = yield this.wildcardService.find({});

            for(let prediction of predictions) {
                let fixture = fixtures.filter(f => f._id.toString() === prediction.fixtureId.toString())[0];

                let wildcard;
                if(prediction.wildcardId != undefined) {
                    wildcard = wildcards.filter(w => w._id.toString() === prediction.wildcardId.toString())[0];
                }

                var pointsResult = predictionPointsCalculator(prediction, fixture, wildcard);
                prediction.points = pointsResult.points;
                prediction.bonusPoints = pointsResult.bonusPoints;
                prediction.correctScore = pointsResult.correctScore;
                prediction.correctResult = pointsResult.correctResult;

                yield this.predictionRepository.replaceOne(prediction._id, prediction);
            }

            console.log('Finished calculating points');

            console.log('Populating predictions');
            for(let prediction of predictions) {
                let fixture = fixtures.filter(f => f._id.toString() === prediction.fixtureId.toString())[0];

                let wildcard;
                if(prediction.wildcardId != undefined) {
                    wildcard = wildcards.filter(w => w._id.toString() === prediction.wildcardId.toString())[0];
                }

                prediction.wildcard = wildcard;
                prediction.fixture = fixture;
            }
            console.log('Finished Populating predictions');

            console.log('Creating snapshots');
            //create snapshots
            var users = yield this.userService.find({});
            var previousSnapshots = yield this.leaderTableService.find({});

            console.log('For rounds');
            var leaderTableSnapshots = rounds
                .map(round => leaderTableSnapshotFactory(predictions, users, round._id, previousSnapshots));

            console.log('For overall');
            var overallSnapshot = leaderTableSnapshotFactory(predictions, users);

            leaderTableSnapshots.push(overallSnapshot);

            console.log('Inserting snapshots');
            yield this.leaderTableService.insertMany(leaderTableSnapshots);

            console.log('Finished creating new snapshots');
            this.context.status = 200;

            console.log('Finished creating new snapshots');
        } catch(ex) {
            console.error('Error creating snapshot ' + ex.stack);
            throw ex;
        }
    }
}

module.exports = AdminLeaderTableController;
