'use strict';

var predictionPointsCalculator = require('../admin/leaderTables/predictionPointsCalculator');

class PredictionController {
    constructor(context, fixtureService, predictionService) {
        this.context = context;
        this.currentUser = context.currentUser;
        this.fixtureService = fixtureService;
        this.predictionService = predictionService;
    }

    *findAll() {
        var userId = this.currentUser._id;

        var fixtures = yield this.fixtureService.findAll();
        var predictions = [];

        for(var fixture of fixtures) {
            var foundPredictions = yield this.predictionService.find(userId, fixture._id);

            var prediction;

            if(foundPredictions.length === 0) {
                prediction = {
                    userId: userId,
                    fixtureId: fixture._id,
                    createdOn: new Date(),
                    updatedOn: new Date()
                };

                yield this.predictionService.insert(prediction);
            } else {
                prediction = foundPredictions[0]
            }

            prediction.points = predictionPointsCalculator(prediction, fixture);
            prediction.fixture = fixture;
            prediction.editable = yield this.fixtureService.isEditable(prediction.fixtureId);

            predictions.push(prediction);
        }

        this.context.body = predictions;

        this.context.status = 200;
    }

    *saveAll(predictions) {
        var userId = this.currentUser.userId;

        var editablePredictions = [];
        for(var prediction of predictions) {
            if(this.fixtureService.isEditable(prediction.fixtureId)) {
                editablePredictions.push(prediction);
            }
        }

        yield this.predictionService.update(userId, editablePredictions);

        this.context.status = 200;
    }
}

module.exports = PredictionController;