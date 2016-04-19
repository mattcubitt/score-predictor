'use strict';

var getLocalMoment = require('../dateHelpers').GetLocalMoment;

class LeaderTableService {
    constructor() {
        this.leaderTableSnapshots = [{
            _id: 1,
            createdOn: getLocalMoment().add(1, 'minute').toDate(),
            roundId: 1,
            userPoints: [{
                name: 'matt',
                position: 1,
                lastPosition: 2,
                points: 99
            }, {
                name: 'aloke',
                position: 2,
                lastPosition: 2,
                points: 50
            }, {
                name: 'wing',
                position: 3,
                lastPosition: 2,
                points: 30
            }, {
                name: 'pete',
                position: 4,
                lastPosition: 2,
                points: 1
            }]
        }, {
            _id: 2,
            createdOn: getLocalMoment().add(5, 'minute').toDate(),
            roundId: 2,
            userPoints: [{
                name: 'matt',
                position: 1,
                lastPosition: 2,
                points: 10
            }, {
                name: 'pete',
                position: 2,
                lastPosition: 2,
                points: 5
            }, {
                name: 'wing',
                position: 3,
                lastPosition: 2,
                points: 4
            }, {
                name: 'aloke',
                position: 4,
                lastPosition: 2,
                points: 1
            }]
        }];
    }

    getLatest(roundId) {
        var sortedLeaderTableSnapshots = this.leaderTableSnapshots
            .filter(s => s.roundId === roundId)
            .sort((a, b) => a.createdOn > b.createdOn);

        if(sortedLeaderTableSnapshots.length === 0)
            return null;

        return sortedLeaderTableSnapshots[0];
    }
}

module.exports = new LeaderTableService();