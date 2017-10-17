/**
 * Created by tangxiafeng on 2016/11/10.
 */


'use strict';

const http = require('http');
import path = require("path");
//扫描装饰器
import {scannerDecoration} from "@jingli/restful";
scannerDecoration(path.join(__dirname, 'server'), ['static', 'views']);

import {$init} from './server';
const PORT = 3000;

$init()
    .then( (app) => {
        let server = http.createServer(app);
        return new Promise((resolve, reject) => {
            server.listen(PORT, function(err) {
                if (!err) {
                    console.info(`server listen on ${PORT} ...`)
                    return resolve(true);
                }
                reject(err);
            });
        })
    })
    .catch( (err) => {
        console.error(err.stack ? err.stack : err);
        process.exit(-1);
    })

