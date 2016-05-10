'use strict';

class WildcardController {
    constructor(context, wildcardRepository, predictionRepository) {
        this.context = context;
        this.wildcardRepository = wildcardRepository || require('../repository').Create('wildcards');
        this.predictionRepository = predictionRepository || require('../repository').Create('predictions');
    }

    *getWildcards(userId) {
        var wildcards = yield this.wildcardRepository.find({});
        //use wildcard service
        var roundPredictions = yield this.predictionRepository
            .find({ userId: userId });

        var availableWildcards = wildcards.map(wildcard => {
            return {
                _id: wildcard._id,
                type: wildcard.type,
                description: wildcard.description,
                reminding: 2 - roundPredictions.filter(p => p.wildcardId === wildcard._id.toString()).length
            };
        });

        this.context.body = availableWildcards
    }
}

module.exports = WildcardController;