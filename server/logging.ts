/**
 * Created by tangxiafeng on 2016/11/24.
 */

'use strict';

const log4js = require("log4js");

var config = {
    appenders: {
        cheese: {
            type: 'file',
            filename: 'logs/access.log',
            category: 'http'
        },
    },
    categories: { default: { appenders: ['cheese'], level: 'error' } }
}

log4js.configure(config);

export function getLogger(category) {
    return log4js.getLogger(category);
}

export function middleware() : any {
    return log4js.connectLogger(getLogger('http'), {level: 'auto'});
}