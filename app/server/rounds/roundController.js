'use strict';

var rounds = require('./roundsConfig');

class RoundController {
    constructor(context) {
        this.context = context;
    }

    *findAll() {
        this.context.body = rounds;

        this.context.status = 200;
    }
}

module.exports = RoundController;
