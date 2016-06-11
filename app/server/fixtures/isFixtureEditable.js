var getLocalDate = require('../dateHelpers').GetLocalDate;

module.exports = function(fixture) {
    var localTime = getLocalDate();

    return localTime.getTime() < fixture.startsOn.getTime();
};