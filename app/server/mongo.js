'use strict';

var mongodb = require('mongodb');
var config = require('./config');

class Mongo {
    *connect(url) {
        if (this.db) {
            yield this.db.close();
        }

        this.db = yield mongodb.connect(url);
    }
}

module.exports = new Mongo();