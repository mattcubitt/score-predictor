var moment = require('moment-timezone');

module.exports = {
    FromLocalToUtc: function(localDate) {
        return moment.tz(localDate, 'Europe/London').utc().toDate();
    },
    FromUtcToLocal: function(utcDate) {
        return moment(utcDate).tz('Europe/London').toDate();
    },
    GetLocalDate: function() {
        return moment(new Date()).tz('Europe/London').toDate();
    },
    GetLocalMoment: function() {
        return moment().tz('Europe/London');
    }
};