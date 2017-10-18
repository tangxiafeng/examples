/**
 * Created by tangxiafeng on 2016/11/5.
 */


'use strict';
import {AbstractModel} from "../../../model";
import Sequelize = require('sequelize');
import {AbstractEntityObject} from '../../../entity';
import {DbModels, defineTable} from '../../db';
import {Service} from "@a/restful";

defineTable('Column', {
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
        default:1
    },
    parentId: {
        type: Sequelize.INTEGER,
        default: 0
    },
    ordered: {
        type: Sequelize.INTEGER,
        default: 5,
    },
    isDisplay: {
        type: Sequelize.BOOLEAN,
        default: true,
    }
});

export class Column extends AbstractEntityObject{
    id: number;
    name: string;
    type: string;
    parentId: number;
    ordered: number;
    isDisplay: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;

    private $sqlModel: Sequelize.Instance<Column>;

    constructor(sqlmodel: Sequelize.Instance<Column>) {
        super(null);
        this.$sqlModel = sqlmodel;
        let obj = sqlmodel.toJSON();
        for(var key in obj) {
            this[key] = obj[key];
        }
    }
}

@Service('columnModel')
export class ColumnModel extends AbstractModel<Column> {
    constructor() {
        super(DbModels['Column'], Column);
    }

    async getColumnsByParent(parentId: number = 0) { 
        return this.fetchAll({parentId: parentId}, {order: [['ordered', 'desc']]})
    }
}