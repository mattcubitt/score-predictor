'use strict';

class FixtureService {
    constructor() {
        this.fixtures = [{
            fixtureId: 1,
            homeTeam: 'GER',
            homeScore: 0,
            awayTeam: 'ENG',
            awayScore: 1,
            kickOffOn: new Date() + 200000
        }];
    }

    findAll() {
        return this.fixtures;
    }
}

module.exports = new FixtureService();