var co = require('co');
var mongodb = require('mongodb');

co(function*() {
    "use strict";
    var db = yield mongodb.connect('mongodb://localhost:27017/euro-2016-predictor');

    debugger;
});