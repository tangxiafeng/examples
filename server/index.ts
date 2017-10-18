/**
 * Created by tangxiafeng on 2016/11/5.
 */


'use strict';

import express = require("express");
import log4js = require('./logging');
import path = require("path");
import bodyParser = require("body-parser");
import ejs = require("ejs");
import {registerControllerToRouter} from "@a/restful";
import {middleware} from "./view";

let logger = log4js.getLogger("route");

const app = express();
const ADMIN_DIR = '/admin';
app.locals.ADMIN_DIR = ADMIN_DIR;
app.use(ADMIN_DIR, express.static(path.join(__dirname, 'static')));
app.use(express.static(path.join(__dirname, '../www')));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({type: 'application/json'}));
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.renderFile);
app.set('view engine', 'html');
app.use(log4js.middleware());

const router = express.Router();
export async function $init() :Promise<any> {
    app.use(middleware.bind(app));
    registerControllerToRouter(router);
    app.use('/', router);
    // await app.use(render);
    await catchRouterError();
    return app;
}

function catchRouterError() {
    //捕获错误
    app.use((err, req, res, next) => {
        if (err == 404 || err.code == 404) {
            return res.redirect('/404.html');
        }
        next(err);
    });

    app.use((err, req, res, next) => {
        //如果是生产环境直接定向到50x.html
        if (process['NODE_ENV'] == 'production') {
            logger.error(err.stack ? err.stack : err);
            return res.redirect('/50x.html');
        }
        next(err);
    });
}