/**
 * Created by tangxiafeng on 2017/6/11.
 */
'use strict';

let CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    rules: [
        {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                use: 'css-loader'
            })
        },
        {
            test: /\.(woff|eot|ttf|svg|woff2)$/, // Have to configure fonts loaders for the generated fonts
            use: ['url-loader'],
        },
        {
            test: /\.ts$/,
            loader: 'ts-loader?'+JSON.stringify({
                configFileName: 'tsconfig.web.json'
            })
        },
        {
            test: /\.(html)$/,
            loader: 'html-loader?'+JSON.stringify({
                minimize: true,
            }),
        },
        {
            test: /\.(png)|(gif)|(jpg)|(jpeg)$/,
            loader: 'file-loader'
        }
    ]
}