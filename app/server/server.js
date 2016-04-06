var koa = require('koa');
var bodyParser = require('koa-bodyparser');
var serve = require('koa-static');
var webpack = require('webpack');
var devMiddleware = require("koa-webpack-dev-middleware");
var hotMiddleware = require("koa-webpack-hot-middleware");
var path = require('path');
var webpackConfig = require('../../webpack.config');
var compiler = webpack(webpackConfig);

var authRoute = require('./auth/authRoute');
var fixtureRoute = require('./fixtures/fixtureRoute');
var predictionRoute = require('./predictions/predictionRoute');

var users = require('../users/userService');
var predictions = require('../predictions/predictionService');
var fixtures = require('../fixtures/fixtureService');

var app = koa();

app.use(function* () {
    this.users = users;
    this.predictions = predictions;
    this.fixtures = fixtures;
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

app.listen(3000);