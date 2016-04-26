'use strict';

class FixtureController {
    constructor(context, fixtureService) {
        this.context = context;
        this.fixtureService = fixtureService;
    }

    *findAll() {
        this.context.body = yield this.fixtureService.findAll();
        this.context.status = 200;
    }
}

module.exports = FixtureController;
