'use strict';

require('co-mocha');
var chai = require('chai');
var expect = chai.expect;
var isFixtureEditable = require('./isFixtureEditable');
var moment = require('moment');

describe('fixtureService', () => {
    it('if fixture is in the future isEditable should return true', function *() {
        var fixture = {
            startsOn: moment().add(1, 'days').toDate()
        };

        var isEditable = isFixtureEditable(fixture);

        expect(isEditable).to.be.true;
    });

    it('if fixture is in the past isEditable should return false', function *() {
        var fixture = {
            startsOn: moment().add(-1, 'days').toDate()
        };

        var isEditable = isFixtureEditable(fixture);

        expect(isEditable).to.be.false;
    });
});