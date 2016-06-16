'use strict';

var co = require('co');
var mongo = require('./mongo');
var config = require('./config');

co(function*() {
    yield mongo.connect(process.env.MONGO_URI_LIVE);

    var predictionRepository = require('./repository').Create('predictions');
    var fixtureRepository = require('./repository').Create('fixtures');
    var wildcardRepository = require('./repository').Create('wildcards');
    var userRepository = require('./repository').Create('users');

    var fixtures = yield fixtureRepository.find({});
    var predictions = yield predictionRepository.find({});
    var wildcards = yield wildcardRepository.find({});
    var users = yield userRepository.find({});
    
    var sortedFixtures = fixtures.sort((a, b) => a.startsOn > b.startsOn ? 1 : -1);

    for(let fixture of sortedFixtures) {
        console.log(`Fixture ${fixture.homeScore} ${fixture.homeTeam} vs ${fixture.awayTeam} ${fixture.awayScore} on ${fixture.startsOn}`);
        var fixturePredictions = predictions.filter(p => p.fixtureId.toString() === fixture._id.toString());

        var sortedFixturePredictions = fixturePredictions.sort((a, b) => a.points < b.points ? 1 : -1);

        for(let fixturePrediction of sortedFixturePredictions) {
            var user = users.filter(u => u._id.toString() === fixturePrediction.userId.toString())[0];

            if(user === undefined) {
                continue;
            }

            var wildcard = null;

            if(fixturePrediction.wildcardId) {
                wildcard = wildcards.filter(w => w._id.toString() === fixturePrediction.wildcardId.toString())[0].type;
            }

            if(wildcard !== 'penalty-points') {
                continue;
            }

            console.log(`User ${user.email} predicted ${fixturePrediction.homeScore} - ${fixturePrediction.awayScore} points = ${fixturePrediction.points} wildcard = ${wildcard}`);
        }
        console.log(' ');
    }

    process.exit();
}).catch(e => {
    console.error(e);
    process.exit();
});