var Router = require('koa-router');

var mongo = require('../../mongo');
var AdminFixtureController = require('./adminFixtureController');
var FixtureService = require('../../fixtures/fixtureService');

module.exports = Router({ prefix: '/fixtures' })
    .post('/', function *() {
        var adminFixtureController = new AdminFixtureController(this, new FixtureService(mongo.db));
        yield adminFixtureController.create(this.request.body);
    })
    .delete('/:fixtureId', function *() {
        var adminFixtureController = new AdminFixtureController(this, new FixtureService(mongo.db));
        yield adminFixtureController.delete(this.param.fixtureId);
    })
    .put('/', function *() {
        var adminFixtureController = new AdminFixtureController(this, new FixtureService(mongo.db));
        yield adminFixtureController.update(this.request.body);
    })
    .routes();
