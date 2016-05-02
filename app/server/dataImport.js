var co = require('co');
var mongo = require('./mongo');
var bcrypt = require('bcrypt-nodejs');
var data = require('./dataImport.data');
var moment = require('moment');

co(function*() {
    yield mongo.connect();

    var usersCollection = mongo.db.collection('users');
    var fixturesCollection = mongo.db.collection('fixtures');
    var predictionsCollection = mongo.db.collection('predictions');
    var leaderTableSnapshotsCollection = mongo.db.collection('leaderTableSnapshots');

    console.log('------------------USERS------------------');
    yield usersCollection.remove({});
    yield usersCollection.insert(data.users);

    var users = yield usersCollection.find({}).toArray();
    console.log(users);

    console.log('------------------FIXTURES------------------');
    yield fixturesCollection.remove({});
    yield fixturesCollection.insert(data.fixtures);

    var fixtures = yield fixturesCollection.find({}).toArray();
    console.log(fixtures);

    console.log('------------------PREDICTIONS------------------');
    yield predictionsCollection.remove({});

    for(var user of users) {
        //TODO: add random predictions here
    }

    var predictionsCollection = yield predictionsCollection.find({}).toArray();
    console.log(predictionsCollection);

    console.log('------------------LEADER TABLE SNAPSHOTS------------------');
    yield leaderTableSnapshotsCollection.remove({});

    //update with user ids
    data.snapshots = data.snapshots.map(snapshot => {
        snapshot.userPoints = snapshot.userPoints.map(userPoint => {
            var user = users.filter(users => users.name === userPoint.name)[0];

            userPoint.userId = user._id;

            return userPoint;
        });

        return snapshot;
    });

    leaderTableSnapshotsCollection.insert(data.snapshots);

    var leaderTableSnapshots = yield leaderTableSnapshotsCollection.find({}).toArray();
    console.log(leaderTableSnapshots);

    process.exit();
}).catch(e => {
    console.error(e);
    process.exit();
});