'use strict';

class AdminFixtureController {
    constructor(context, fixtureService) {
        this.context = context;
        this.fixtureService = fixtureService;
    }

    *create(fixture) {
        var id = yield this.fixtureService.insert(fixture);

        this.context.body = id;
        this.context.status = 200;
    }

    *delete(fixtureId) {
        yield this.fixtureService.remove(parseInt(fixtureId));

        this.context.status = 200;
    }

    *update(fixture) {
        yield this.fixtureService.update(fixture);

        this.context.status = 200;
    }
}

module.exports = AdminFixtureController;
