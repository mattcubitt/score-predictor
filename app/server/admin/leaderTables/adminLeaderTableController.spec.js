'use strict';

require('co-mocha');
var chai = require('chai');
var expect = chai.expect;
var mongo = require('../../mongo');
var moment = require('moment');

var AdminLeaderTableController = require('./adminLeaderTableController');

var PredictionService = require('../../predictions/predictionService');
var FixtureService = require('../../fixtures/fixtureService');
var RoundService = require('../../rounds/roundService');
var UserService = require('../../users/userService');
var LeaderTableService = require('../../leaderTables/leaderTableService');

var data = require('../../dataImport.data');

describe('integration tests', () => {
    describe('adminLeaderTableController', () => {
        it('creates leader table snapshots', function *() {
            yield mongo.connect('mongodb://test:test@ds011462.mlab.com:11462/score-predictor-test');

            var usersCollection = mongo.db.collection('users');
            yield usersCollection.remove({});
            var fixturesCollection = mongo.db.collection('fixtures');
            yield fixturesCollection.remove({});
            var predictionsCollection = mongo.db.collection('predictions');
            yield predictionsCollection.remove({});
            var leaderTableSnapshotsCollection = mongo.db.collection('leaderTableSnapshots');
            yield leaderTableSnapshotsCollection.remove({});

            yield usersCollection.insert([{
                name: 'matt',
                email: 'matt@test.com'
            }, {
                name: 'aloke',
                email: 'aloke@test.com'
            }]);

            var users = yield usersCollection.find({}).toArray();

            yield fixturesCollection.insert({
                roundId: 1,
                homeTeam: 'ALB',
                homeScore: 2,
                awayScore: 1,
                awayTeam: 'AUT',
                startsOn: moment().add(-10, 'days').toDate()
            });

            var fixtures = yield fixturesCollection.find({}).toArray();

            yield predictionsCollection.insert([{
                fixtureId: fixtures[0]._id,
                userId: users[0]._id,
                homeScore: 2,
                awayScore: 1
            }, {
                fixtureId: fixtures[0]._id,
                userId: users[1]._id,
                homeScore: 0,
                awayScore: 1
            }]);

            var controller = new AdminLeaderTableController(this, new PredictionService(mongo.db),
                new FixtureService(mongo.db),
                new RoundService(mongo.db),
                new UserService(mongo.db),
                new LeaderTableService(mongo.db));

            yield controller.createNewSnapshot();

            var snapshots = yield leaderTableSnapshotsCollection.find({}).toArray();

            var overallSnapshot = snapshots.filter(s => s.isOverall)[0];
            var overallSnapshotMatt = overallSnapshot.userPoints.filter(u => u.name === 'matt')[0];
            var overallSnapshotAloke = overallSnapshot.userPoints.filter(u => u.name === 'aloke')[0];

            expect(overallSnapshotMatt.position).to.be.equal(1);
            expect(overallSnapshotMatt.points).to.be.equal(3);

            expect(overallSnapshotAloke.position).to.be.equal(2);
            expect(overallSnapshotAloke.points).to.be.equal(0);

            var roundOneSnapshot = snapshots.filter(s => s.roundId === 1)[0];
            var roundOneSnapshotMatt = roundOneSnapshot.userPoints.filter(u => u.name === 'matt')[0];
            var roundOneSnapshotAloke = roundOneSnapshot.userPoints.filter(u => u.name === 'aloke')[0];

            expect(roundOneSnapshotMatt.position).to.be.equal(1);
            expect(roundOneSnapshotMatt.points).to.be.equal(3);

            expect(roundOneSnapshotAloke.position).to.be.equal(2);
            expect(roundOneSnapshotAloke.points).to.be.equal(0);
        });
    });
});

