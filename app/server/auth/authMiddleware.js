var authConfig = require('./authConfig');
var jwt = require('jsonwebtoken');

module.exports = function*(next){
    try {
        // var token = this.request.header.authorization;
        //
        // var options = {
        //     audience: authConfig.audience,
        //     issuer: authConfig.issuer
        // };

        //var claims = jwt.verify(token, authConfig.privateKey, options);

        //this.currentUser = this.userService.find(claims.email);
        this.currentUser = {
            userId: 1,
            name: 'matt',
            email: 'test@email.com',
            password: 'password'
        };

        yield next;

    } catch(ex) {
        this.status = 401;
        this.body = 'Unauthorized';
    }
};