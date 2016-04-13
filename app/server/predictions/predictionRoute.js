var Router = require('koa-router');
var authMiddleware = require('../auth/authMiddleware');
var moment = require('moment');

module.exports = Router({ prefix: '/predictions' })
    .use(authMiddleware)
    .get('/', function *(next) {
        var userId = this.currentUser.userId;

        var fixtures = this.fixtureService.findAll();
        var predictions = [];

        for(var fixture of fixtures) {
            var foundPredictions = this.predictionService.find(userId, fixture._id);

            var prediction;

            if(foundPredictions.length === 0) {
                prediction = {
                    userId: userId,
                    fixtureId: fixture._id,
                    points: 0,
                    createdOn: new Date(),
                    updatedOn: new Date()
                };

                this.predictionService.insert(prediction);
            } else {
                prediction = foundPredictions[0]
            }

            prediction.fixture = fixture;
            prediction.editable = this.fixtureService.isEditable(prediction.fixtureId);

            predictions.push(prediction);
        }

        this.body = predictions;

        this.status = 200;
        yield next;
    })
    .post('/', function *(next) {
        var predictions = this.request.body;
        var userId = this.currentUser.userId;

        var editablePredictions = predictions
            .filter(prediction => this.fixtureService.isEditable(prediction.fixtureId));

        this.predictionService.update(userId, editablePredictions);

        this.status = 200;
        yield next;
    })
    .routes();