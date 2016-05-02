var bcrypt = require('bcrypt-nodejs');
var moment = require('moment');

module.exports = {
    users: [{
        name: 'matt',
        email: 'matt@test.com',
        password: bcrypt.hashSync('password', null, null),
        role: 'admin'
    }, {
        name: 'aloke',
        email: 'aloke@test.com',
        password: bcrypt.hashSync('password', null, null)
    }, {
        name: 'wing',
        email: 'wing@test.com',
        password: bcrypt.hashSync('password', null, null)
    }, {
        name: 'pete',
        email: 'pete@test.com',
        password: bcrypt.hashSync('password', null, null)
    }, {
        name: 'mason',
        email: 'mason@test.com',
        password: bcrypt.hashSync('password', null, null)
    }, {
        name: 'david',
        email: 'david@test.com',
        password: bcrypt.hashSync('password', null, null)
    }, {
        name: 'dan',
        email: 'dan@test.com',
        password: bcrypt.hashSync('password', null, null)
    }],
    rounds: [{
        _id: 1,
        name: 'Group stage 1'
    }, {
        _id: 2,
        name: 'Group stage 2'
    }],
    fixtures: [{
        roundId: 1,
        homeTeam: 'ALB',
        homeScore: 2,
        awayScore: 1,
        awayTeam: 'AUT',
        startsOn: moment().add(-10, 'days').toDate()
    }, {
        roundId: 2,
        homeTeam: 'BEL',
        homeScore: 0,
        awayScore: 1,
        awayTeam: 'CRO',
        startsOn: moment().add(-9, 'days').toDate()
    }, {
        roundId: 1,
        homeTeam: 'CZE',
        homeScore: 0,
        awayScore: 3,
        awayTeam: 'ENG',
        startsOn: moment().add(-8, 'days').toDate()
    }, {
        roundId: 2,
        homeTeam: 'ESP',
        homeScore: 0,
        awayScore: 0,
        awayTeam: 'FRA',
        startsOn: moment().add(-7, 'days').toDate()
    }, {
        roundId: 1,
        homeTeam: 'GER',
        homeScore: 1,
        awayScore: 1,
        awayTeam: 'HUN',
        startsOn: moment().add(-6, 'days').toDate()
    }, {
        roundId: 2,
        homeTeam: 'IRL',
        homeScore: 2,
        awayScore: 4,
        awayTeam: 'ISL',
        startsOn: moment().add(-5, 'days').toDate()
    }, {
        roundId: 1,
        homeTeam: 'ITA',
        homeScore: 0,
        awayScore: 2,
        awayTeam: 'NIR',
        startsOn: moment().add(-4, 'days').toDate()
    }, {
        roundId: 2,
        homeTeam: 'POL',
        homeScore: 3,
        awayScore: 1,
        awayTeam: 'ROU',
        startsOn: moment().add(-3, 'days').toDate()
    }, {
        roundId: 1,
        homeTeam: 'RUS',
        homeScore: 5,
        awayScore: 1,
        awayTeam: 'SUI',
        startsOn: moment().add(-2, 'days').toDate()
    }, {
        roundId: 2,
        homeTeam: 'SVK',
        homeScore: 3,
        awayScore: 1,
        awayTeam: 'SWE',
        startsOn: moment().add(-1, 'days').toDate()
    }, {
        roundId: 1,
        homeTeam: 'TUR',
        homeScore: 2,
        awayScore: 1,
        awayTeam: 'UKR',
        startsOn: moment().add(1, 'days').toDate()
    }, {
        roundId: 2,
        homeTeam: 'WAL',
        homeScore: 1,
        awayScore: 1,
        awayTeam: 'ENG',
        startsOn: moment().add(2, 'days').toDate()
    }],
    snapshots: []
    // snapshots: [{
    //     createdOn: moment().add(-10, 'days').toDate(),
    //     roundId: 1,
    //     isOverall: false,
    //     userPoints: [{
    //         position: 1,
    //         name: 'matt',
    //         points: 10
    //     }, {
    //         position: 2,
    //         name: 'aloke',
    //         points: 5
    //     }, {
    //         position: 3,
    //         name: 'wing',
    //         points: 3
    //     }, {
    //         position: 4,
    //         name: 'pete',
    //         points: 1
    //     }, {
    //         position: 5,
    //         name: 'mason',
    //         points: 1
    //     }, {
    //         position: 6,
    //         name: 'david',
    //         points: 1
    //     }, {
    //         position: 7,
    //         name: 'dan',
    //         points: 1
    //     }]
    // }, {
    //     createdOn: moment().add(-9, 'days').toDate(),
    //     roundId: 2,
    //     isOverall: false,
    //     userPoints: [{
    //         position: 1,
    //         name: 'matt',
    //         points: 20
    //     }, {
    //         position: 2,
    //         name: 'aloke',
    //         points: 15
    //     }, {
    //         position: 3,
    //         name: 'wing',
    //         points: 13
    //     }, {
    //         position: 4,
    //         name: 'pete',
    //         points: 10
    //     }, {
    //         position: 5,
    //         name: 'mason',
    //         points: 1
    //     }, {
    //         position: 6,
    //         name: 'david',
    //         points: 1
    //     }, {
    //         position: 7,
    //         name: 'dan',
    //         points: 1
    //     }]
    // }, {
    //     createdOn: moment().add(-9, 'days').toDate(),
    //     isOverall: true,
    //     userPoints: [{
    //         position: 1,
    //         name: 'matt',
    //         points: 20
    //     }, {
    //         position: 2,
    //         name: 'aloke',
    //         points: 15
    //     }, {
    //         position: 3,
    //         name: 'wing',
    //         points: 13
    //     }, {
    //         position: 4,
    //         name: 'pete',
    //         points: 10
    //     }, {
    //         position: 5,
    //         name: 'mason',
    //         points: 1
    //     }, {
    //         position: 6,
    //         name: 'david',
    //         points: 1
    //     }, {
    //         position: 7,
    //         name: 'dan',
    //         points: 1
    //     }]
    // }]
};