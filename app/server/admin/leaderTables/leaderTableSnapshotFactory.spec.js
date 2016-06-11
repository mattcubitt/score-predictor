'use strict';

require('co-mocha');
var chai = require('chai');
var expect = chai.expect;
var moment = require('moment');

var leaderTableSnapshotFactory = require('./leaderTableSnapshotFactory');

describe('leaderTableSnapshotFactory', () => {
    it('creates overall snapshot for all predictions', function *() {
        var predictions = [{
            userId: 1,
            homeScore: 0,
            awayScore: 0,
            fixture: {
                homeScore: 0,
                awayScore: 0
            },
            points: 3
        }];

        var users = [{
            _id: 1,
            name: 'matt'
        }];

        var actualSnapshot = leaderTableSnapshotFactory(predictions, users);

        var actualUserPoints = actualSnapshot.userPoints
            .filter(p => p.userId === users[0]._id)[0]
            .points;

        expect(actualSnapshot.isOverall).to.be.true;
        expect(actualUserPoints).to.be.equal(3);
    });

    it('creates overall snapshot with bonus points', function *() {
        var predictions = [{
            userId: 1,
            homeScore: 0,
            awayScore: 0,
            fixture: {
                homeScore: 0,
                awayScore: 0
            },
            points: 3,
            bonusPoints: 1
        }];

        var users = [{
            _id: 1,
            name: 'matt'
        }];

        var actualSnapshot = leaderTableSnapshotFactory(predictions, users);

        var actualUserBonusPoints = actualSnapshot.userPoints
            .filter(p => p.userId === users[0]._id)[0]
            .bonusPoints;

        expect(actualSnapshot.isOverall).to.be.true;
        expect(actualUserBonusPoints).to.be.equal(1);
    });

    it('creates overall snapshot with clean sheet wildcard count', function *() {
        var predictions = [{
            userId: 1,
            homeScore: 0,
            awayScore: 0,
            fixture: {
                homeScore: 0,
                awayScore: 0,
                startsOn: moment().add(-1, 'days').toDate()
            },
            points: 3,
            bonusPoints: 1,
            editable: false,
            wildcard: {
                type: 'clean-sheet-points'
            }
        }];

        var users = [{
            _id: 1,
            name: 'matt'
        }];

        var actualSnapshot = leaderTableSnapshotFactory(predictions, users);

        var cleanSheetsWildcardCount = actualSnapshot.userPoints
            .filter(p => p.userId === users[0]._id)[0]
            .cleanSheetsWildcardCount;

        expect(actualSnapshot.isOverall).to.be.true;
        expect(cleanSheetsWildcardCount).to.be.equal(1);
    });
});