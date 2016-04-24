var fs = require('fs');

module.exports = {
    issuer: 'euro-2016-predictor.herokuapp.com',
    audience: 'euro-2016-predictor.herokuapp.com',
    privateKey: process.env.PRIVATE_KEY
};