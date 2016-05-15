'use strict';

require('co-mocha');
var chai = require('chai');
var expect = chai.expect;
var mongo = require('../../mongo');
var moment = require('moment');

var AdminLeaderTableController = require('./adminLeaderTableController');

var data = require('../../dataImport.data');

describe('adminLeaderTableController', function() {

    var usersCollection, fixturesCollection, predictionsCollection,
        leaderTableSnapshotsCollection, wildcardsCollection;

    var setup = function*() {
        usersCollection = mongo.db.collection('users');
        yield usersCollection.remove({});
        fixturesCollection = mongo.db.collection('fixtures');
        yield fixturesCollection.remove({});
        predictionsCollection = mongo.db.collection('predictions');
        yield predictionsCollection.remove({});
        wildcardsCollection = mongo.db.collection('wildcards');
        yield wildcardsCollection.remove({});
        leaderTableSnapshotsCollection = mongo.db.collection('leaderTableSnapshots');
        yield leaderTableSnapshotsCollection.remove({});
    };

    it('creates leader table snapshots', function *() {
        yield mongo.connect('mongodb://test:test@ds011462.mlab.com:11462/score-predictor-test');

        yield setup();

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

        var controller = new AdminLeaderTableController({context: {}});

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

    it('creates leader table snapshot with wildcards', function *() {
        yield mongo.connect('mongodb://test:test@ds011462.mlab.com:11462/score-predictor-test');

        yield setup();

        yield usersCollection.insert([{
            name: 'matt',
            email: 'matt@test.com'
        }]);

        var users = yield usersCollection.find({}).toArray();

        yield fixturesCollection.insert({
            roundId: 1,
            homeTeam: 'FRA',
            homeScore: 2,
            awayScore: 1,
            awayTeam: 'ESP',
            startsOn: moment().add(-1, 'days').toDate()
        });

        yield fixturesCollection.insert({
            roundId: 1,
            homeTeam: 'GER',
            homeScore: 0,
            awayScore: 1,
            awayTeam: 'ENG',
            startsOn: moment().add(1, 'days').toDate()
        });

        var fixtures = yield fixturesCollection.find({}).toArray();

        yield wildcardsCollection.insert(data.wildcards);

        var wildcards = yield wildcardsCollection.find({}).toArray();
        var triplePointsWildcard = wildcards[2];

        yield predictionsCollection.insert([{
            wildcardId: triplePointsWildcard._id,
            fixtureId: fixtures[0]._id,
            userId: users[0]._id,
            homeScore: 2,
            awayScore: 1
        }, {
            fixtureId: fixtures[0]._id,
            userId: users[0]._id,
            homeScore: 0,
            awayScore: 0
        }]);

        var controller = new AdminLeaderTableController({context: {}});

        yield controller.createNewSnapshot();

        var snapshots = yield leaderTableSnapshotsCollection.find({}).toArray();
        var predictions = yield predictionsCollection.find({}).toArray();

        var franceSpainPrediction = predictions[0];
        var germanyEnglandPrediction = predictions[1];

        var roundOneSnapshot = snapshots.filter(s => s.roundId === 1)[0];
        var roundOneSnapshotMatt = roundOneSnapshot.userPoints.filter(u => u.name === 'matt')[0];

        expect(roundOneSnapshotMatt.position).to.be.equal(1);
        expect(roundOneSnapshotMatt.points).to.be.equal(9);

        expect(franceSpainPrediction.points).to.be.equal(9);
        expect(germanyEnglandPrediction.points).to.be.equal(0);
    });
});

