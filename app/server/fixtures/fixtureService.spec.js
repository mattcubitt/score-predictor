'use strict';

require('co-mocha');
var chai = require('chai');
var expect = chai.expect;
var FixtureService = new require('./fixtureService');
var moment = require('moment');

describe('fixtureService', () => {
    it('if fixture is in the future isEditable should return true', function *() {
        var fixture = {
            startsOn: moment().add(1, 'days').toDate()
        };

        var fixtureService = new FixtureService({ collection: () => {}});
        var isEditable = fixtureService.isEditable(fixture);

        expect(isEditable).to.be.true;
    });

    it('if fixture is in the past isEditable should return false', function *() {
        var fixture = {
            startsOn: moment().add(-1, 'days').toDate()
        };

        var fixtureService = new FixtureService({ collection: () => {}});
        var isEditable = fixtureService.isEditable(fixture);

        expect(isEditable).to.be.false;
    });
});