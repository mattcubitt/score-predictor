'use strict';

require('co-mocha');
var chai = require('chai');
var expect = chai.expect;

var leaderTableService = require('./leaderTableService');

describe('leaderTableService', () => {
    it('foo', function *() {
        var latestTable = leaderTableService.getLatest(1);

        console.log(latestTable);
    });
});