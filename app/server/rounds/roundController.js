'use strict';

class RoundController {
    constructor(context, roundService) {
        this.context = context;
        this.roundService = roundService;
    }

    *findAll() {
        this.context.body = yield this.roundService.findAll();

        this.context.status = 200;
    }
}

module.exports = RoundController;
