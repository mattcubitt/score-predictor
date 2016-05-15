'use strict';

require('co-mocha');
var chai = require('chai');
var expect = chai.expect;
var stubSetup = require('../stubSetup');

var LeaderTableController = require('./leaderTableController');

describe('leaderTableController', () => {
    it('get latest should return empty array when leader tables have no data', function *() {
        var context = {};
        var rounds = require('../rounds/roundsConfig');
        var leaderTables = [null, null, null, null, null];

        var leaderTableController = new LeaderTableController(context,
                                            stubSetup.leaderTableService(rounds, leaderTables, null));

        yield leaderTableController.getLatest();

        var actualLeaderTables = context.body;
        var actualStatus = context.status;

        var expectedLeaderTables = [];
        var expectedStatus = 200;

        expect(actualLeaderTables).to.deep.equal(expectedLeaderTables);
        expect(actualStatus).to.deep.equal(expectedStatus);
    });
});