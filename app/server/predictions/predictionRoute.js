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
                    createdOn: new Date(),
                    updatedOn: new Date()
                };

                this.predictionService.insert(prediction);
            } else {
                prediction = foundPredictions[0]
            }

            prediction.fixture = fixture;

            var nowUtc = moment().utc().toDate();
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

        // var isEditable = this.fixtureService.isEditable(prediction.fixtureId);//nowUtc < prediction.fixture.startOn;
        //
        // if(!isEditable) {
        //     this.status = 409;
        // }

        this.predictionService.save(userId, predictions);

        this.status = 200;
        yield next;
    })
    .routes();
