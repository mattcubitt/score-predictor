'use strict';

module.exports = {
    clean: function*(db) {
        var collectionNames = yield db.collectionNames;

        for(var collectionName of collectionNames) {
            yield db.collection(collectionName).deleteMany({});
        }
    },
    restore: function*(db, data) {

    },
    dump: function*(db) {

    }
};