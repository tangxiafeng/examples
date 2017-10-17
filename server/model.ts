/**
 * Created by tangxiafeng on 2016/11/8.
 */

'use strict';
import {IPaginate, Paginate, IEntityObject} from "./entity";

export interface IModel<T extends IEntityObject> {
    get(id: number): Promise<T>;
    fetchOne(where: any, options: any): Promise<T>;
    fetchAll(where: any, options: any): Promise<Array<T>>;
    count(where: any, options: any): Promise<number>;
    paginate(where: any, options: any): Promise<IPaginate<T>>;
    update(obj: T): Promise<T>;
    create(obj): Promise<T>;
    save(obj): Promise<T>;
    destroy(obj: T): Promise<boolean>;
}

export class AbstractModel<T extends IEntityObject> implements IModel<T> {
    constructor(public $dbModel, public $class) {
    }

    async save(obj: any) :Promise<T> {
        if (!obj.id) {
            return this.create(obj);
        } else {
            return this.update(<T>obj);
        }
    }

    async create(obj): Promise<T> {
        obj = await this.$dbModel.build(obj);
        obj = await obj.save();
        return new this.$class(obj);
    }

    async get(id:number):Promise<T> {
        let obj = await this.$dbModel.findById(id);
        if (!obj) return undefined;
        return new this.$class(obj);
    }

    async fetchOne(where: any, options?: any) :Promise<T> {
        if (!options) {
            options = {};
        }
        options.where = where;
        let obj = await this.$dbModel.findOne(options);
        if (!obj) return undefined;
        return new this.$class(obj);
    }

    async fetchAll(where:any, options?:any):Promise<Array<T>> {
        let self = this;
        if (!options) {
            options = {}
        }
        options.where = where;
        let arr = await this.$dbModel.findAll(options);
        if (arr && arr.length) {
            return arr.map( (v) => {
                // console.log("map==>", v)
                return new self.$class(v);
            })
        }
        return [];
    }

    async paginate(where:any, options?:any):Promise<IPaginate<T>> {
        if (!options) {
            options = {};
        }

        let paginate = new Paginate(this, where, options);
        return paginate.fetch();
    }

    async update(obj:T):Promise<T> {
        let self = this;
        let id = obj.id;
        if (!id) return null;
        await self.$dbModel.update(obj, {where: {id: id}});
        return self.get(id);
    }

    async destroy(obj:T):Promise<boolean> {
        let self = this;
        let ret = await self.$dbModel.destroy({where: {id: obj.id}})
        return !!ret;
    }

    async count(where: any, options: any): Promise<number> {
        let self = this;
        return self.$dbModel.count({where: where});
    }
}