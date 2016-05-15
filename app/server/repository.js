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

    *insertMany(collection) {
        return yield this.getCollection().insertMany(collection);
    }

    *replaceOne(id, document) {
        yield this.getCollection().replaceOne({_id : id}, document);
    }
}

Repository.Create = (collectionName) => new Repository(collectionName);

module.exports = Repository;