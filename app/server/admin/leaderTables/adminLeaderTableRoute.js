var Router = require('koa-router');
var pointsCalculator = require('./predictionPointsCalculator');
var getLocalMoment = require('../../dateHelpers').GetLocalMoment;
var leaderTablePositionCalculator = require('./leaderTablePositionCalculator');

module.exports = Router({ prefix: '/leaderTables' })
    .post('/', function *() {
        var predictions = this.predictionService.findAll()
            .map(prediction => {
                prediction.fixture = this.fixtureService.find(prediction.fixtureId);
                return prediction;
            });

        var leaderTableSnapshots = this.roundService.findAll()
            .map(round => {
                var userPoints = this.userService.findAll()
                    .map(user => {
                        var points = predictions
                            .filter(p => p.userId === user._id && p.fixture.roundId === round._id)
                            .map(p => pointsCalculator(p, p.fixture))
                            .reduce((p1, p2) => p1 + p2, 0);

                        return {
                            userId: user._id,
                            name: user.name,
                            points: points
                        }
                    });

                return {
                    createdOn: getLocalMoment().toDate(),
                    roundId: round._id,
                    userPoints: leaderTablePositionCalculator(userPoints)
                }
            });

        this.leaderTableService.insertAll(leaderTableSnapshots);
        this.status = 200;
    })
    .routes();
