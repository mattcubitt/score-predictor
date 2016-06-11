'use strict';

var co = require('co');
var mongo = require('./mongo');
var bcrypt = require('bcrypt-nodejs');
var data = require('./dataImport.data');
var moment = require('moment');
var config = require('./config');
var leaderTableSnapshotFactory = require('./admin/leaderTables/leaderTableSnapshotFactory');
var rounds = require('./rounds/roundsConfig');
var predictionPointsCalculator = require('./admin/leaderTables/pointsCalculator');

co(function*() {
    try {
        yield mongo.connect(process.env.MONGODB_URI_TEST);

        var predictionRepository = require('./repository').Create('predictions');
        var fixtureRepository = require('./repository').Create('fixtures');
        var leaderTableService = require('./repository').Create('leaderTableSnapshots');
        var wildcardService = require('./repository').Create('wildcards');
        var userService = require('./repository').Create('users');

        console.log('creating new snapshot');

        var predictions = yield predictionRepository.find({});
        var fixtures = yield fixtureRepository.find({});
        var wildcards = yield wildcardService.find({});

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

            yield predictionRepository.replaceOne(prediction._id, prediction);
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
        var users = yield userService.find({});
        var previousSnapshots = yield leaderTableService.find({});

        console.log('For rounds');
        var leaderTableSnapshots = rounds
            .map(round => leaderTableSnapshotFactory(predictions, users, round._id, previousSnapshots));

        console.log('For overall');
        var overallSnapshot = leaderTableSnapshotFactory(predictions, users);

        leaderTableSnapshots.push(overallSnapshot);

        console.log('Inserting snapshots');
        yield leaderTableService.insertMany(leaderTableSnapshots);

        console.log('Finished creating new snapshots');
    }
    catch(ex) {
        console.error(ex);
    }

    process.exit();
}).catch(e => {
    console.error(e);
    process.exit();
});