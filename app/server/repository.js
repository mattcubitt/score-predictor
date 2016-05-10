'use strict';

class Repository {
    constructor(collectionName) {
        this.collectionName = collectionName;
    }

    getCollection() {
        var db = require('./mongo').db;

        return db.collection(this.collectionName);
    };

    *find(query) {
        return yield this.getCollection().find(query).toArray();
    }

    *findOne(query) {
        return yield this.getCollection().findOne(query);
    }
}

Repository.Create = (collectionName) => new Repository(collectionName);

module.exports = Repository;