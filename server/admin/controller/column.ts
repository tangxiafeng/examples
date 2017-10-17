/**
 * Created by tangxiafeng on 2017/6/3.
 */


'use strict';
import {ColumnModel, Column} from "../../module/column/model/index";
import {AbstractController, AutoInject, Restful, Router} from "@jingli/restful";

@Restful('/admin/column')
export class ColumnController  extends AbstractController {
    constructor() {
        super();
    }

    $isValidId(id: string) {
        return /^\d+$/.test(id);
    }

    @AutoInject()
    get columnModel() :ColumnModel{ return null}
    set columnModel(columnModel: ColumnModel) {}


    async get(req, res, next) {
        let {id} = req.params;
        let column = await this.columnModel.get(id);
        res.json(column);
    }

    async add(req, res, ) {
        let obj = req.body;
        let column = await this.columnModel.save(obj);
        res.json(column);
    }

    async update(req, res, ) {
        let {id} = req.params;
        let obj = req.body;
        let column = await this.columnModel.save(obj);
        res.json(column);
    }

    async find(req, res, ) {
        let {p, pz} = req.query;
        let pg = await this.columnModel.paginate({}, {page: p, pageSize: pz});
        console.log("PG===>", pg)
        res.locals.pg = pg;
        res.view('admin/column/index.html')
    }

    @Router('/save', 'GET')
    async save(req, res, next) { 
        let column = req.body
        let {id} = req.query;
        if (!column || !Object.keys(column).length) {
            if (id) {
                column = await this.columnModel.get(id);
            } else { 
                column = {}
            }
        }
        res.view('admin/column/save.html', {column: column});
    }

    @Router('/save', 'POST')
    async doSave(req, res, next) { 
        let column = req.body;
        if (!column) {
            res.locals.error_msg = '信息不完整';
            return this.save.bind(this)(req, res, next);
        }
        column = await this.columnModel.save(column);
        res.locals.success_msg = '保存成功';
        return this.save(req, res, next);
    }

    async delete(req, res, next) {
        console.log(req.params)
        let { id } = req.params;
        console.log("id", id)
        let column = await this.columnModel.get(id);
        let ret = await this.columnModel.destroy(column);
        res.json(this.reply(0, ret));
    }

}