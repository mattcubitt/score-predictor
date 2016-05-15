'use strict';

require('co-mocha');
var chai = require('chai');
var expect = chai.expect;
var mongo = require('../mongo');
var moment = require('moment');
var dataHelpers = require('../dataHelpers');

var data = require('../dataImport.data');

// describe('integration tests', () => {
//     describe('wildcardController', () => {
//         it('get wildcards', function *() {
//             yield mongo.connect('mongodb://test:test@ds011462.mlab.com:11462/score-predictor-test');
//
//             yield dataHelpers.clean(mongo.db);
//         });
//     });
// });
//
