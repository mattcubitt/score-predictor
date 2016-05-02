'use strict';

var bcrypt = require('bcrypt-nodejs');

class UserService {
    constructor(db) {
        this.users = db.collection('users');
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

    //TODO: move out
    comparePassword(plainText, hash) {
        return bcrypt.compareSync(plainText, hash);
    }
}

module.exports = UserService;