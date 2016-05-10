'use strict';

var ObjectID = require('mongodb').ObjectID;

class WildcardService {
    constructor(wildcardRepository, predictionRepository) {
        this.wildcardRepository = wildcardRepository || require('../repository').Create('wildcards');
        this.predictionRepository = predictionRepository || require('../repository').Create('predictions');
    }

    *getWildcard(id) {
        return yield this.wildcardRepository.findOne({_id : new ObjectID(id) });
    }

    *getReminding(userId, wildcardType) {
        var wildcard = yield this.wildcardRepository.findOne({type : wildcardType });
        var predictions = yield this.predictionRepository.find({ userId: userId, wildcardId: wildcard._id });

        return 2 - predictions.length;
    }
}

module.exports = WildcardService;