/**
 * Created by tangxiafeng on 2016/11/10.
 */

'use strict';

import C = require('../../config');
import Sequelize = require('sequelize');

export var DbModels = {};

let db = new Sequelize(C['database']['url']);
export function defineTable(name: string, defined: any, options?: any) {
    if (!options) {
        options = {};
    }
    options.tablename = name.toLowerCase();
    DbModels[name] = db.define(name, defined, options);
}

export function dbSync() {
    db.sync({force: true});
    return true;
}