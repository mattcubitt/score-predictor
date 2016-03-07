var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
    addVendor: function (name, path) {
        this.resolve.alias[name] = path;
        this.module.noParse.push(new RegExp(path));
    },
    entry: './app.js',
    output: {
        filename: 'public/bundle.js'
    },
    plugins: [
        new ExtractTextPlugin('bundle.css')
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.scss$/,
                exclude: [/node_modules/], // sassLoader will include node_modules explicitly
                loader: ExtractTextPlugin.extract("style", "css!postcss!sass?outputStyle=expanded")
            }
        ]
    },
    sassLoader: {
        includePaths: ['/node_modules']
    }
};

config.addVendor('bootstrap', '/node_modules/bootstrap/bootstrap.min.js');
config.addVendor('bootstrap.css','/node_modules/bootstrap/bootstrap.min.css');

module.exports = config;