'use strict';

require('co-mocha');
var chai = require('chai');
var expect = chai.expect;
var fromLocalToUtc = require('./dateHelpers').FromLocalToUtc;
var fromUtcToLocal = require('./dateHelpers').FromUtcToLocal;
var getLocalDate = require('./dateHelpers').GetLocalDate;
var moment = require('moment');

describe('dateHelpers ', () => {
    it('can convert from local date time to utc and back again', function *() {
        var expectedDate = new Date();

        var utcDate = fromLocalToUtc(expectedDate);
        var actualDate = fromUtcToLocal(utcDate);

        // Date.prototype.toJSON = function(){ return moment(this).format(); };
        //
        // var foo = JSON.stringify({ date: actualDate });

        expect(expectedDate.getTime()).to.be.equal(actualDate.getTime())
    });

    it('can convert from local date time to utc and back again', function *() {
        var localDate = getLocalDate();

        var time = localDate.getTime();
    });
});