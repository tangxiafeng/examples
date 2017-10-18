/**
 * Created by tangxiafeng on 2016/11/5.
 */


'use strict';
import {AbstractModel} from "../../../model";
import Sequelize = require('sequelize');
import {IEntityObject} from '../../../entity';
import {defineTable, DbModels} from '../../db';
import {Service} from "@a/restful";

export enum EMenuType {
    TOP = 1,
    BOTTOM = 2
}

defineTable('Menu', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING(50)
    },
    type: {
        type: Sequelize.INTEGER,
        default: EMenuType.TOP,
    },
    url: {
        type: Sequelize.TEXT,
    }
});

export class Menu implements IEntityObject {
    id: number;
    name: string;
    type: EMenuType;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;

    constructor(public obj: any) {
        for(var key in obj) {
            this[key] = obj[key];
        }
    }

    toJSON() {
        var self = this;
        var obj: any = {};
        for(let key in self) {
            if (typeof key != 'function') {
                obj[key] = self[key];
            }
        }
        return obj;
    }
}

@Service('menuModel')
export class MenuModel extends AbstractModel<Menu> {
    constructor() {
        super(DbModels['Menu'], Menu);
    }
}