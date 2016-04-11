'use strict';
var moment = require('moment');

class FixtureService {
    constructor() {
        this.fixtures = [{
            _id: 1,
            homeTeam: 'GER',
            homeScore: 0,
            awayTeam: 'ENG',
            awayScore: 1,
            startsOn: moment().utc().add(-1, 'minute').toDate()
        }, {
            _id: 2,
            homeTeam: 'ENG',
            homeScore: 1,
            awayTeam: 'GER',
            awayScore: 1,
            startsOn: moment().utc().add(5, 'minute').toDate()
        }];
    }

    findAll() {
        return this.fixtures;
    }

    isEditable(fixtureId) {
        var foundFixtures = this.fixtures.filter(f => f._id === fixtureId);

        if(foundFixtures.length > 0) {
            var nowUtc = moment().utc().toDate();

            return nowUtc < foundFixtures[0].startsOn
        }

        return true;
    }
}

module.exports = new FixtureService();