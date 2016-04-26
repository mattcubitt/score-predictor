'use strict';
var getLocalDate = require('../dateHelpers').GetLocalDate;
var getLocalMoment = require('../dateHelpers').GetLocalMoment;
var moment = require('moment');

class FixtureService {
    constructor(db) {
        this.fixtures = db.collection('fixtures');
    }

    *find(fixtureId) {
        return yield this.fixtures.find({ _id: fixtureId }).toArray();
    }

    *findAll() {
        return yield this.fixtures.find({ }).toArray();
    }

    //TODO: move to helper function?
    *isEditable(fixtureId) {
        var foundFixtures = yield this.find({ _id: fixtureId });

        var localTime = getLocalDate();

        if(foundFixtures.length > 0) {
            return localTime.getTime() < foundFixtures[0].startsOn.getTime()
        }

        return true;
    }

    *insert(fixture) {
        fixture._id = new Date().getTime();
        fixture.startsOn = moment(fixture.startsOn).toDate();

        yield this.fixtures.insertOne(fixture);

        return fixture._id;
    }

    *remove(fixtureId) {
        yield this.fixtures.deleteOne({ _id: fixtureId });
    }

    *update(fixture) {
        yield this.fixtures.updateOne({_id : fixture._id}, fixture)
    }
}

module.exports = FixtureService;