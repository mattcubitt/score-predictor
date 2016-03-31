var fs = require('fs');

module.exports = {
    issuer: 'auth.yoursite.com',
    audience: 'yoursite.com',
    privateKey: fs.readFileSync(__dirname + '\/demo.rsa')
};