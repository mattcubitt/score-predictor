'use strict';

var co = require('co');
var mongo = require('./mongo');
var config = require('./config');

co(function*() {
    yield mongo.connect(process.env.MONGODB_URI_TEST);

    var predictionRepository = require('./repository').Create('predictions');
    var fixtureRepository = require('./repository').Create('fixtures');
    var wildcardRepository = require('./repository').Create('wildcards');
    var userRepository = require('./repository').Create('users');

    var fixtures = yield fixtureRepository.find({});
    var predictions = yield predictionRepository.find({});
    var wildcards = yield wildcardRepository.find({});
    var users = yield userRepository.find({});

    for(let fixture of fixtures) {
        console.log(fixture);
        var fixturePredictions = predictions.filter(p => p.fixtureId.toString() === fixture._id.toString());

        for(let fixturePrediction of fixturePredictions) {
            var user = users.filter(u => u._id.toString() === fixturePrediction.userId.toString())[0];

            var wildcard = null;

            if(fixturePrediction.wildcardId) {
                wildcard = wildcards.filter(w => w._id.toString() === fixturePrediction.wildcardId.toString())[0];
            }

            console.log(``);
        }
    }

    process.exit();
}).catch(e => {
    console.error(e);
    process.exit();
});