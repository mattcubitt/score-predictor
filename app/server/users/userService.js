'use strict';

var bcrypt = require('bcrypt-nodejs');

class UserService {
    constructor(db) {
        // this.users = [{
        //     _id: 1,
        //     name: 'matt',
        //     email: 'matt.d.cubitt@gmail.com',
        //     password: '$2a$04$jEsLdQv9mSfKiNSvU7fsZ.ZeJnv0cGleaR3dXwaIEkzBW4S1eC0bW',
        //     role: 'admin'
        // }];
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