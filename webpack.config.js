/**
 * Created by tangxiafeng on 2017/1/11.
 */
'use strict';
let path = require("path");
let webpack = require("webpack");

module.exports = {
    entry: {
        index: ['./www/index'],
        vendor: ['jquery', 'moment', 'lodash', ],
        kindeditor: ['kindeditor'],
        bootstrap: ['bootstrap']
    },
    output: {
        path: path.resolve(__dirname, "www/libs"),
        filename: 'bundle.[name].js',
        chunkFilename: '[id].js',
        publicPath: '/libs/'
    },
    module: require("./webpack/module"),
    devtool: "source-map",
    plugins: require('./webpack/plugin'),
    resolve: {
        extensions: ['.js', '.json', '.ts']
    }
}