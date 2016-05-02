'use strict';

var ObjectID = require('mongodb').ObjectID;

class PredictionService {
    constructor(db) {
        this.predictions = db.collection('predictions');
    }

    *findAll() {
        return yield this.predictions.find({ }).toArray();
    }

    // *find(userId) {
    //     return yield this.predictions.find({ userId: userId }).toArray();
    // }

    *findByUserId(userId) {
        return yield this.predictions.find({ userId: userId }).toArray();
    }

    // *find(id, fixtureId) {
    //     return yield this.predictions.find({ _id: new ObjectID(id), fixtureId: new ObjectID(fixtureId) }).toArray();
    // }

    *update(userId, predictions) {
        for(var prediction of predictions) {
            var foundPredictions = yield this.predictions.find({ _id: new ObjectID(prediction._id), userId: userId }).toArray();

            if(foundPredictions.length > 0) {
                var foundPrediction = foundPredictions[0];

                var result = yield this.predictions.updateOne({_id : foundPrediction._id}, {
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