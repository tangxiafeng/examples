/**
 * Created by tangxiafeng on 2016/11/8.
 */

'use strict';
import path = require("path");
import fs = require("fs");
import ejs = require('ejs');

import {Response} from 'express/lib/response'
import crypto = require("crypto");
const C = require('../config');
import _ = require("lodash");

let templates = new Map();

//模板渲染
export interface IViewConfig {
    viewPath?: string;          //模板路径
    autoRelateName?: boolean;   //是否自动与函数名称管理
    ext?: string;               //模板后缀
}
var viewConfig = {
    viewPath: path.join(__dirname, 'views/'),
    ext: '.html',
    autoRelateName: true
};

export function config(conf: IViewConfig) {
    for(let key in conf) {
        viewConfig[key] = conf[key];
    }
}

export function middleware(req, res, next) {
    let self = this;
    res.view = async function(viewPath?:string, obj?: any, callback?: Function) {
        if (typeof obj == 'function') {
            obj = {};
            callback = <Function>obj;
        }
        obj = _.defaults(obj, res.locals);
        obj = _.defaults(obj, self.locals);
        try {
            let self: Response = res;
            let cb = callback;
            if (viewPath && typeof viewPath != 'string') {
                obj = viewPath;
                cb = <Function>obj;
                viewPath = req.path + viewConfig.ext;
            }
            if (!obj) {
                obj = {};
            }
            let tplStr = await getTemplate(viewPath);
            let options = {
                filename: viewPath,
                ext: 'html'
            }
            options['root'] = path.resolve(process.cwd(), 'server/views')
            let template = ejs.compile(tplStr, options);
            let content = template(obj);
            if (cb && typeof cb == 'function')
                return cb(null, content);
            self.send(content);
        } catch(err) {
            next(err);
        }
    }
    next();
}

async function getTemplate(viewPath) {
    let viewAbsolutePath = path.join(viewConfig.viewPath, viewPath);
    let key;
    if (C.viewCache) {
        key = crypto.createHash('md5').update(viewAbsolutePath).digest('hex');
        let template = templates.get(key)
        if (template)
            return template;
    }

    return new Promise((resolve, reject) => {
        fs.exists(viewAbsolutePath, function(exists) {
            if (!exists) {
                let err = new Error('模板文件' + viewAbsolutePath+'不存在');
                return reject(err);
            }

            fs.readFile(viewAbsolutePath, function(err, template: any) {
                if (err)
                    return reject(err);

                template = template.toString();
                if (C.viewCache) {
                    templates.set(key, template);
                }
                resolve(template);
            })
        })
    })

}