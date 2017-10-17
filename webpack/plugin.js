/**
 * Created by tangxiafeng on 2017/6/11.
 */
'use strict';
let CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ProviderPlugin = require("webpack/lib/ProvidePlugin");

module.exports = [
    new CommonsChunkPlugin({
        names: ['vendor', 'manifest']
    }),
    new ExtractTextPlugin('bundle.lib.css'),
    // new UglifyJSPlugin({
    //     mangle: false,
    // }),
    new ProviderPlugin({
        $: "jquery",
        jQuery: 'jquery',
    })
]