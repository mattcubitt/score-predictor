'use strict';

var getLocalDate = require('../dateHelpers').GetLocalDate;

class PredictionService {
    constructor(db) {
        this.predictions = db.collection('predictions');
    }

    *findAll() {
        return yield this.predictions.find({ }).toArray();
    }

    *find(userId) {
        return yield this.predictions.find({ userId: userId }).toArray();
    }

    *find(userId, fixtureId) {
        return yield this.predictions.find({ userId: userId, fixtureId: fixtureId }).toArray();
    }

    *find(id, fixtureId) {
        return yield this.predictions.find({ _id: id, fixtureId: fixtureId }).toArray();
    }

    *update(userId, predictions) {
        for(var prediction of predictions) {
            var foundPredictions = yield this.find(prediction._id, userId).toArray();

            if(foundPredictions.length > 0) {
                var foundPrediction = foundPredictions[0];

                yield this.fixtures.updateOne({_id : foundPrediction._id}, {
                    $set: { 'homeScore': prediction.homeScore, 'awayScore': prediction.awayScore },
                    $currentDate: { 'updatedOn': true }
                });
            }
        }
    }

    *insert(prediction) {
        yield this.predictions.insertOne(prediction);
    }
}

module.exports = PredictionService;