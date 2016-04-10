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
            startOn: moment().utc().add(1, 'minute').toDate()
        }, {
            _id: 2,
            homeTeam: 'ENG',
            homeScore: 1,
            awayTeam: 'GER',
            awayScore: 1,
            startOn: moment().utc().add(5, 'minute').toDate()
        }];
    }

    findAll() {
        return this.fixtures;
    }
}

module.exports = new FixtureService();