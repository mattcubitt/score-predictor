'use strict';

var predictionPointsCalculator = require('../admin/leaderTables/pointsCalculator');

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

        var userPredictions = yield this.predictionService
            .findByUserId(userId);

        for(var fixture of fixtures) {
            var fixturePredictions = userPredictions
                .filter(p => p.fixtureId.toString() === fixture._id.toString());

            var prediction;

            if(fixturePredictions.length === 0) {
                prediction = {
                    userId: userId,
                    fixtureId: fixture._id,
                    createdOn: new Date(),
                    updatedOn: new Date()
                };

                yield this.predictionService.insert(prediction);
            } else {
                prediction = fixturePredictions[0];
            }

            prediction.points = predictionPointsCalculator(prediction, fixture);
            prediction.fixture = fixture;
            prediction.editable = this.fixtureService.isEditable(fixture);

            predictions.push(prediction);
        }

        this.context.body = predictions;

        this.context.status = 200;
    }

    *saveAll(predictions) {
        var userId = this.currentUser._id;

        var editablePredictions = [];
        for(var prediction of predictions) {
            var fixtures = yield this.fixtureService.find(prediction.fixtureId);
            
            if(fixtures[0] && this.fixtureService.isEditable(fixtures[0])) {
                editablePredictions.push(prediction);
            }
        }

        yield this.predictionService.update(userId, editablePredictions);

        this.context.status = 200;
    }
}

module.exports = PredictionController;