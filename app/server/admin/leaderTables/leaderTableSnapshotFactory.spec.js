'use strict';

require('co-mocha');
var chai = require('chai');
var expect = chai.expect;

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
            }
        }];

        var users = [{
            _id: 1,
            name: 'matt'
        }];

        var actualSnapshot = leaderTableSnapshotFactory(predictions, users);
        console.log(actualSnapshot);

        var actualUserPoints = actualSnapshot.userPoints
            .filter(p => p.userId === users[0]._id)[0]
            .points;

        expect(actualSnapshot.isOverall).to.be.true;
        expect(actualUserPoints).to.be.equal(3);
    });
});