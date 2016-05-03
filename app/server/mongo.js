'use strict';

var mongodb = require('mongodb');
var config = require('./config');

class Mongo {
    *connect() {
        if (this.db) {
            yield mongodb.db.close();
        }

        this.db = yield mongodb.connect(config.MONGODB_URI);
    }
}

module.exports = new Mongo();