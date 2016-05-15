'use strict';

var bcrypt = require('bcrypt-nodejs');
var LeaderTableService = require('../leaderTables/leaderTableService');

class UserService {
    constructor(db, leaderTableService) {
        this.users = db.collection('users');
        this.leaderTableService = leaderTableService || new LeaderTableService();
    }

    *findAll() {
        return yield this.users.find({ }).toArray();
    }

    *find(email) {
        var foundUsers = yield this.users.find({ email: email }).toArray();

        if(foundUsers.length === 0)
            return null;

        return foundUsers[0];
    }

    *insert(name, email, password) {
        var user = {
            name: name,
            email: email,
            password: bcrypt.hashSync(password, null, null)
        };

        yield this.users.insertOne(user);

        return user;
    }

    *getTotalPoints(userId) {
        var latestOverallTable = yield this.leaderTableService.getLatestOverall();

        if(latestOverallTable == null) {
            return 0;
        }

        var userPoints = latestOverallTable.userPoints.filter(p => p.userId.toString() === userId.toString());

        return userPoints.length > 0 ? userPoints[0].points : 0;
    }

    //TODO: move out
    comparePassword(plainText, hash) {
        return bcrypt.compareSync(plainText, hash);
    }
}

module.exports = UserService;