'use strict';

class PredictionService {
    constructor() {
        this.predictions = [{
            userId: 1,
            fixtureId: 1,
            homeScore: 1,
            awayScore: 1,
            createdOn: new Date(),
            updatedOn: new Date()
        }];
    }

    find(userId) {
        return this.predictions.filter(p => p.userId == userId);
    }
}

module.exports = new PredictionService();