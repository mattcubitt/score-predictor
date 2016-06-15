'use strict';

var co = require('co');
var mongo = require('./mongo');
var config = require('./config');

co(function*() {
    yield mongo.connect(process.env.MONGODB_URI_LIVE);

    var predictionRepository = require('./repository').Create('predictions');
    var fixtureRepository = require('./repository').Create('fixtures');
    var wildcardRepository = require('./repository').Create('wildcards');
    var userRepository = require('./repository').Create('users');

    var fixtures = yield fixtureRepository.find({});
    var predictions = yield predictionRepository.find({});
    var wildcards = yield wildcardRepository.find({});
    var users = yield userRepository.find({});

    for(let user of users) {
        console.log(`User ${user.name}`);

        var sortedFixtures = fixtures.sort((a, b) => a.startsOn > b.startsOn ? 1 : -1);

        for(let fixture of sortedFixtures) {
            if(fixture.homeScore == undefined && fixture.awayScore == undefined) {
                continue;
            }

            console.log(`Fixture ${fixture.homeScore} ${fixture.homeTeam} vs ${fixture.awayTeam} ${fixture.awayScore} round ${fixture.roundId}`);

            var userPrediction = predictions.filter(p => p.userId.toString() === user._id.toString() &&
                p.fixtureId.toString() === fixture._id.toString())[0];

            if(userPrediction === undefined) {
                continue;
            }

            var wildcard = null;

            if(userPrediction.wildcardId != null) {
                wildcard = wildcards.filter(w => w._id.toString() === userPrediction.wildcardId.toString())[0].type;
            }

            console.log(`Predicted ${userPrediction.homeScore} - ${userPrediction.awayScore} points = ${userPrediction.points} wildcard = ${wildcard}`);
        }
        console.log(' ');
    }

    process.exit();
}).catch(e => {
    console.error(e.stack);
    process.exit();
});