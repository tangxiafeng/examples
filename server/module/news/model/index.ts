/**
 * Created by tangxiafeng on 2016/11/5.
 */


'use strict';
import {AbstractModel} from "../../../model";
import Sequelize = require('sequelize');

import {defineTable, DbModels} from '../../db';
import {AbstractEntityObject} from "../../../entity";
import {Service} from "@jingli/restful";

defineTable('News', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: Sequelize.TEXT,
    },
    content: {
        type: Sequelize.TEXT,
    },
    author: {
        type: Sequelize.TEXT,
    },
    userId: {
        type: Sequelize.INTEGER
    },
    categoryId: {
        type: Sequelize.INTEGER
    },
    columnId: {
        type: Sequelize.INTEGER,
    },
    isTop: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
    isRecommend: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    }
});

export class News  extends AbstractEntityObject {
    public title: string;
    public content: string;
    public author: string;
    public userId: number;
    public categoryId: number;
    public columnId: number;
    public isTop: boolean;
    public isRecommend: boolean;

    constructor(public $target: any) {
        super($target);
    }
}

@Service('newsModel')
export class NewsModel extends AbstractModel<News> {
    constructor() {
        super(DbModels["News"], News);
    }

    async getNext(id: number) {
        let where = {
            id: {
                $gt: id,
            }
        }
        return this.fetchOne( where, { order: [["id", "asc"]] })
    }

    async getLast(id: number) { 
        let where = {
            id: {
                $lt: id,
            }
        }
        return this.fetchOne(where, { order: [["id", "desc"]] });
    }
}