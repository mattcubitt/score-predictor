'use strict';
var getLocalDate = require('../dateHelpers').GetLocalDate;
var moment = require('moment');
var ObjectID = require('mongodb').ObjectID;

class FixtureService {
    constructor(db) {
        this.fixtures = db.collection('fixtures');
    }

    *findOne(query) {
        return yield this.fixtures.findOne(query);
    }

    *find(fixtureId) {
        return yield this.fixtures.find({ _id: new ObjectID(fixtureId) }).toArray();
    }

    *findAll() {
        return yield this.fixtures.find({ }).toArray();
    }
    
    isEditable(fixture) {
        var localTime = getLocalDate();

        return localTime.getTime() < fixture.startsOn.getTime();
    }

    *insert(fixture) {
        fixture.startsOn = moment(fixture.startsOn).toDate();

        yield this.fixtures.insertOne(fixture);

        return fixture._id;
    }

    *remove(fixtureId) {
        yield this.fixtures.deleteOne({ _id: new ObjectID(fixtureId) });
    }

    *update(fixture) {
        fixture._id = new ObjectID(fixture._id);
        fixture.startsOn = moment(fixture.startsOn).toDate();

        yield this.fixtures.replaceOne({_id : fixture._id}, fixture);
    }
}

module.exports = FixtureService;