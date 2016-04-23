'use strict';

var bcrypt = require('bcrypt-nodejs');

class UserService {
    constructor() {
        this.users = [{
            _Id: 1,
            name: 'matt',
            email: 'matt.d.cubitt@gmail.com',
            password: 'password'
        }];
    }

    findAll() {
        return this.users;
    }

    find(email) {
        var foundUsers = this.users.filter(u => u.email == email);

        if(foundUsers.length === 0)
            return null;

        return foundUsers[0];
    }

    insert(name, email, password) {
        var user = {
            name: name,
            email: email,
            password: bcrypt.hashSync(password, null, null)
        };
        this.users.push(user);

        return user;
    }

    comparePassword(plainText, hash) {
        return bcrypt.compareSync(plainText, hash);
    }
}

module.exports = new UserService();