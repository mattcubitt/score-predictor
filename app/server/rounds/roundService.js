'use strict';

class RoundService {
    constructor() {
        this.rounds = [{
            _id: 1,
            name: 'Group stage 1'
        }, {
            _id: 2,
            name: 'Group stage 2'
        }, {
            _id: 3,
            name: 'Group stage 3'
        }, {
            _id: 4,
            name: 'Last 16'
        }, {
            _id: 5,
            name: 'Finals'
        }];
    }

    findAll() {
        return this.rounds;
    }
}

module.exports = RoundService;