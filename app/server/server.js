var co = require('co');
var mongo = require('./mongo');
var mongodb = require('mongodb');
var config = require('./config');
var moment = require('moment');

var koa = require('koa');
var gzip = require('koa-gzip');
var bodyParser = require('koa-bodyparser');
var serve = require('koa-static');
var logger = require('koa-logger');
var webpack = require('webpack');
var devMiddleware = require('koa-webpack-dev-middleware');
var hotMiddleware = require('koa-webpack-hot-middleware');
var path = require('path');
var webpackConfig = require('../../webpack.config');
var compiler = webpack(webpackConfig);

var authRoute = require('./auth/authRoute');
var fixtureRoute = require('./fixtures/fixtureRoute');
var predictionRoute = require('./predictions/predictionRoute');
var roundRoute = require('./rounds/roundRoute');
var adminRoute = require('./admin/adminRoute');
var leaderTableRoute = require('./leaderTables/leaderTableRoute');

Date.prototype.toJSON = function(){ return moment(this).format(); };

var app = co.wrap(function *() {
    yield mongo.connect();

    var app = koa();

    app.use(gzip());
    app.use(logger());
    app.use(bodyParser());

    if(config.NODE_ENV === 'debug') {
        app.use(devMiddleware(compiler, {
            noInfo: true, publicPath: webpackConfig.output.publicPath
        }));

        app.use(hotMiddleware(compiler, {
            log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
        }));
    }
    
    app.use(serve(path.resolve(__dirname, '../client')));

    app.use(authRoute);
    app.use(fixtureRoute);
    app.use(predictionRoute);
    app.use(roundRoute);
    app.use(adminRoute);
    app.use(leaderTableRoute);

    app.listen(config.PORT);

    console.log('Listening on port ' + config.PORT);
});

app().catch(function (err) {
    console.error(err.stack);
    process.exit(1);
});