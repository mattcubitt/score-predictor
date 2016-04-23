'use strict';
var getLocalDate = require('../dateHelpers').GetLocalDate;
var getLocalMoment = require('../dateHelpers').GetLocalMoment;
var moment = require('moment');

class FixtureService {
    constructor() {
        this.fixtures = [{
            _id: 1,
            homeTeam: 'GER',
            homeScore: 0,
            awayTeam: 'ENG',
            awayScore: 1,
            startsOn: getLocalMoment().add(-1, 'minute').toDate(),
            roundId: 1
        }, {
            _id: 2,
            homeTeam: 'ENG',
            homeScore: 1,
            awayTeam: 'GER',
            awayScore: 1,
            startsOn: getLocalMoment().add(5, 'minute').toDate(),
            roundId: 2
        }];
    }

    find(fixtureId) {
        return this.fixtures.filter(f => f._id === fixtureId);
    }

    findAll() {
        return this.fixtures;
    }

    isEditable(fixtureId) {
        var foundFixtures = this.fixtures.filter(f => f._id === fixtureId);

        var localTime = getLocalDate();

        if(foundFixtures.length > 0) {
            return localTime.getTime() < foundFixtures[0].startsOn.getTime()
        }

        return true;
    }

    insert(fixture) {
        fixture._id = new Date().getTime();
        fixture.startsOn = moment(fixture.startsOn).toDate();
        this.fixtures.push(fixture);

        return fixture._id;
    }

    remove(fixtureId) {
        this.fixtures = this.fixtures.filter(f => f._id !== fixtureId)
    }

    update(fixture) {
        this.fixtures = this.fixtures.map(f => {
            if(f._id !== fixture._id)
                return f;

            fixture.startsOn = moment(fixture.startsOn).toDate();
            return fixture;
        })
    }
}

module.exports = new FixtureService();