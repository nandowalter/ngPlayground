var webpack = require('webpack');
var helpers = require('./helpers');
var glob = require("glob");

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = {
    entry: glob.sync("./test/unit/**/*.spec.ts"),

    resolve: {
        alias: { 
            '@angular/core': __dirname + '/../test/mocks/angular.core.js'
        },
        extensions: ['', '.ts', '.js']
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader', 'angular2-template-loader']
            }
        ]
    },

    devtool: 'source-map',

    output: {
        path: helpers.root('dist_unit_test'),
        publicPath: '/',
        filename: '[name].spec.js',
        chunkFilename: '[id].chunk.js'
    }
};
