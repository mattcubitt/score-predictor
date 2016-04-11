'use strict';

class PredictionService {
    constructor() {
        this.predictions = [{
            _id: 1,
            userId: 1,
            fixtureId: 1,
            homeScore: 1,
            awayScore: 1,
            points: 3,
            createdOn: new Date(),
            updatedOn: new Date()
        }];
    }

    find(userId) {
        return this.predictions.filter(p => p.userId === userId);
    }

    find(userId, fixtureId) {
        return this.predictions.filter(p => p.userId === userId && p.fixtureId === fixtureId);
    }

    update(userId, predictions) {
        for(var prediction of predictions) {
            var foundPredictions = this.predictions
                .filter(p => p._id === prediction._id && p.userId === userId);

            if(foundPredictions.length > 0) {
                var foundPrediction = foundPredictions[0];

                foundPrediction.homeScore = prediction.homeScore;
                foundPrediction.awayScore = prediction.awayScore;
            }
        }
    }

    insert(prediction) {
        prediction._id = new Date().getTime();
        this.predictions.push(prediction);
    }
}

module.exports = new PredictionService();