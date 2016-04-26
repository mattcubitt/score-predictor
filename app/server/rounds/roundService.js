'use strict';

class RoundService {
    constructor() {
        this.rounds = [{
            _id: 1,
            name: 'Group stage 1'
        }, {
            _id: 2,
            name: 'Group stage 2'
        }];
    }

    findAll() {
        return this.rounds;
    }
}

module.exports = RoundService;