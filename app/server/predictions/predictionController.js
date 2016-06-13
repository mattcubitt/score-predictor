'use strict';

var ObjectID = require('mongodb').ObjectID;
var isFixtureEditable = require('../fixtures/isFixtureEditable');

class PredictionController {
    constructor(context, fixtureService, predictionService, wildcardService) {
        this.context = context;
        this.currentUser = context.currentUser;
        this.fixtureService = fixtureService;
        this.predictionService = predictionService;
        this.wildcardService = wildcardService;
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

            prediction.wildcard = yield this.wildcardService.getWildcard(prediction.wildcardId);
            prediction.fixture = fixture;
            prediction.editable = isFixtureEditable(fixture);

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
            var fixture = fixtures[0];

            if(fixture !== undefined && isFixtureEditable(fixtures[0])) {
                editablePredictions.push(prediction);
            }
        }

        yield this.predictionService.update(userId, editablePredictions);

        this.context.status = 200;
    }

    *deleteWildcard(predictionId) {
        var prediction = yield this.predictionService.findOne({ _id: new ObjectID(predictionId), userId: this.currentUser._id });
        var fixture = yield this.fixtureService.findOne({ _id: new ObjectID(prediction.fixtureId) });

        if(fixture !== undefined && isFixtureEditable(fixture)) {
            prediction.wildcardId = undefined;

            yield this.predictionService.replaceOne(prediction);

            this.context.status = 200;
        } else {
            this.context.status = 409;
            this.context.body = 'Fixture is not editable';
        }
    }

    *addWildcard(predictionId, wildcard) {
        var prediction = yield this.predictionService.findOne({ _id: new ObjectID(predictionId), userId: this.currentUser._id });
        var fixture = yield this.fixtureService.findOne({ _id: new ObjectID(prediction.fixtureId) });

        var remindingWildcards = yield this.wildcardService.getReminding(this.currentUser._id, wildcard.type);

        if(fixture !== undefined && isFixtureEditable(fixture) && remindingWildcards > 0) {
            prediction.wildcardId = wildcard._id;

            yield this.predictionService.replaceOne(prediction);

            this.context.status = 200;
        } else {
            this.context.status = 409;
            this.context.body = 'Fixture is not editable';
        }
    }
}

module.exports = PredictionController;