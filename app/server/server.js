var koa = require('koa');
var bodyParser = require('koa-bodyparser');
var serve = require('koa-static');
var logger = require('koa-logger');
var webpack = require('webpack');
var devMiddleware = require("koa-webpack-dev-middleware");
var hotMiddleware = require("koa-webpack-hot-middleware");
var path = require('path');
var webpackConfig = require('../../webpack.config');
var compiler = webpack(webpackConfig);

var authRoute = require('./auth/authRoute');
var fixtureRoute = require('./fixtures/fixtureRoute');
var predictionRoute = require('./predictions/predictionRoute');
var roundRoute = require('./rounds/roundRoute');

var userService = require('./users/userService');
var predictionService = require('./predictions/predictionService');
var fixtureService = require('./fixtures/fixtureService');
var roundService = require('./rounds/roundService');

var app = koa();

app.use(logger());

app.use(function* (next) {
    this.userService = userService;
    this.predictionService = predictionService;
    this.fixtureService = fixtureService;
    this.roundService = roundService;

    yield next;
});

app.use(bodyParser());
app.use(devMiddleware(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath
}));
app.use(hotMiddleware(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
}));
app.use(serve(path.resolve(__dirname, '../client')));
app.use(authRoute);
app.use(fixtureRoute);
app.use(predictionRoute);
app.use(roundRoute);

app.listen(3000);