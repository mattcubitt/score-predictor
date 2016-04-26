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

// /**
//  * Based on https://github.com/soygul/koan
//  */
// mongodb.connect = function *() {
//     if (mongo.db) {
//         yield mongo.db.close();
//     }
//
//     var db = yield mongo.connect(config.MONGODB_URI);
//
//     debugger;
//     //mongodb.db = db;
// };

// var mongodb = require('mongodb');
// var connect = mongodb.connect;
// var config = require('./config');
//
// module.exports = function *() {
//     // if (mongodb.db) {
//     //     yield mongodb.db.close();
//     // }
//
//     var db = yield mongodb.connect(config.MONGODB_URI);
//
//     debugger;
//     //mongodb.db = db;
// };