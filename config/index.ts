/**
 * Created by tangxiafeng on 2016/11/8.
 */

'use strict';

var defaultConfig = require('./config.default.json');

var config;
try {
    config = require('./config');
} catch(err) {
    config = {};
    console.warn('no config/config.js find!');
}

//重写默认配置
for(var key in config) {
    defaultConfig[key] = config[key];
}

export= defaultConfig;