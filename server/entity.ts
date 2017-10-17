/**
 * Created by tangxiafeng on 2017/6/1.
 */

'use strict';
import {IModel} from "./model";
import Sequelize = require("sequelize")
import * as sequelize from "sequelize";

export interface IEntityObject {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    toJSON();
}

export abstract class AbstractEntityObject implements IEntityObject {
    public id: number;
    public createdAt: Date;
    public updatedAt: Date;
    public deletedAt: Date;
    public $target: IModel<this>;

    constructor(obj: any) {
        if (obj && obj.toJSON && typeof obj.toJSON == 'function') {
            obj = obj.toJSON();
        }
        for(let key in obj) {
            this[key] = obj[key];
        }
        if (!this.createdAt) {
            this.createdAt = new Date();
        }
    }

    setTarget(target: IModel<this>) {
        this.$target = target;
    }

    save() :Promise<this> {
        return this.$target.save(this);
    }

    toJSON() {
        let self = this;
        let obj: any = {}
        for(var key in self) {
            if (!/^\$/.test(key) && typeof self[key] != 'function') {
                obj[key] = self[key];
            }
        }
        return obj;
    }
}

export interface IPaginate<T extends IEntityObject> {
    nextPage():Promise<IPaginate<T>>;
    prevPage():Promise<IPaginate<T>>;
    total: number;
    page: number;
    pageSize: number;
    toJSON:()=> any;
}

export class Paginate<T extends IEntityObject> {
    pages: number;
    page: number;
    pageSize: number;
    total: number;
    items: Array<T>;

    constructor(public $model: IModel<T>, public $where: any, public $options: any) {
        let {page, perPage} = $options;
        this.page = (page  && /^\d+$/.test(page)) ? parseInt(page): 1;
        this.pageSize = (perPage && /^\d+$/.test(perPage)) ? parseInt(perPage) : 10;
        this.total = 0;
        this.pages = 0;
    }

    async fetch(): Promise<this> {
        let self = this;
        self.$options.limit = self.pageSize;
        self.$options.offset = (self.page - 1) * self.pageSize;
        self.items = await self.$model.fetchAll(self.$where, self.$options);
        self.total = await self.$model.count(self.$where, self.$options);
        self.pages = Math.ceil(self.total / self.pageSize);
        return self;
    }

    hasNextPage() :boolean {
        return this.pages > this.page;
    }

    hasPrevPage() : boolean {
        return this.page < 1;
    }

    async nextPage() : Promise<this> {
        let self = this;
        if (self.page >= self.pages) {
            throw new Error('没有下一页')
        }
        self.$options.page = ++self.page;
        return self.fetch();
    }

    async prevPage(): Promise<this> {
        let self = this;
        if (self.page <= 1) {
            throw new Error('没有上一页');
        }
        self.$options.page = --self.page;
        return self.fetch();
    }

    toJSON() {
        let self = this;
        let _items = self.items.map( (v) => {
            return v.toJSON();
        })
        return {
            items: _items,
            pages: self.pages,
            pageSize: self.pageSize,
            page: self.page,
            total: self.total
        }
    }
}
